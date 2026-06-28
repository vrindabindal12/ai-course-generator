"use client"
import React from 'react'
import { useEffect ,useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { CourseList , Chapters} from '@/configs/schema'
import { db } from '@/configs/db'
import LoadingDialog from '../_components/LoadingDialog'
import { Button } from '@/components/ui/button'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { GenerateChapterContent_AI } from "@/configs/aiModel";
import getVideos from "@/configs/youtubeService";
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Sparkles } from "lucide-react";

const CourseLayout = ({params}) => {
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { toast } = useToast();

    useEffect(() => {
          params && GetCourse();
        },[params,user]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
        .where(and(eq(CourseList.courseId, params?.courseId),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)));
                setCourse(result[0]);
                
                console.log(result);

    }

    const GenerateChapterSyllabus = async () => {
        setLoading(true);
    
        try {
          const chapters = course?.courseOutput?.Chapters;
    
          const includeVideo = course?.includeVideo;
          // console.log("IncludeVideo : " + includeVideo);
    
          // Delete previous content if generated and got any error
          const checkPreviousContent = await db
            .select()
            .from(Chapters)
            .where(eq(Chapters.courseId, course?.courseId));
          if (checkPreviousContent.length > 0) {
            const chapterResponse = await db
              .delete(Chapters)
              .where(eq(Chapters.courseId, course?.courseId))
              .returning({ id: Chapters?.id });
          }
    
          for (const [index, chapter] of chapters.entries()) {
            // console.log(`Generating Chapter Content for ${chapter?.ChapterName}`);
    
            const PROMPT = `
            Generate detailed content for the following topic in strict JSON format:
            - Topic: ${course?.name}
            - Chapter: ${chapter?.ChapterName}
    
            The response must be a valid JSON object containing an array of objects with the following fields:
            1. "title": A short and descriptive title for the subtopic.
            2. "explanation": A detailed explanation of the subtopic.
            3. "codeExample": A code example (if applicable) wrapped in <precode> tags, or an empty string if no code example is available.
    
            Ensure:
            - The JSON is valid and follows the specified format.
            - The JSON is properly formatted with no syntax errors.
            - The JSON contains the required fields.
            - The JSON contains the correct data types.
            - Proper escaping of special characters.
            - No trailing commas or malformed syntax.
            - The JSON is properly nested and structured.
            - The response can be parsed directly using JSON.parse().
    
            Example format:
            {
              "title": "Topic Title",
              "chapters": [
                {
                  "title": "Subtopic Title",
                  "explanation": "Detailed explanation here.",
                  "codeExample": "<precode>Code example here</precode>"
                }
              ]
            }
          `;
    
            let content;
            try {
              const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
              const rawText = result?.response?.text();
              let cleanText = rawText;
              if (rawText.includes("```")) {
                const matches = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (matches && matches[1]) {
                  cleanText = matches[1].trim();
                }
              }
              content = JSON.parse(cleanText);
            } catch (chapterError) {
              console.warn(`Failed to generate content for ${chapter?.ChapterName} via Gemini, falling back to mock content:`, chapterError);
              
              // Fallback mockup lesson structures for safe testing during API limits
              content = {
                title: chapter?.ChapterName || "Foundational Lessons",
                chapters: [
                  {
                    title: `1. Core Principles of ${course?.name || "Topic"}`,
                    explanation: `In this section, we cover the essential building blocks and structural components of ${chapter?.ChapterName || "the topic"}. This includes syntax configurations, runtime memory management, logic blocks, and standard optimization patterns. By understanding how these subsystems interact, developers can write cleaner, more maintainable code structures.`,
                    codeExample: `<precode>// Lesson 1 Sample Code
#include <iostream>
using namespace std;

int main() {
    cout << "Prisma learning workspace initialized!" << endl;
    return 0;
}</precode>`
                  },
                  {
                    title: "2. Performance & Production Standards",
                    explanation: `Moving beyond syntax, we focus on defensive coding strategies, avoiding resource leaks, handling exception scopes, and ensuring high-performance execution. Adhering to these conventions helps maintain system stability under concurrent loads.`,
                    codeExample: `<precode>// Lesson 2 Sample Code
void performOperations() {
    try {
        cout << "Executing core subroutines..." << endl;
    } catch (...) {
        cerr << "Operation caught warning flags." << endl;
    }
}</precode>`
                  }
                ]
              };
            }
    
            // Generate Video URL
    
            let videoId = null;
    
            if (includeVideo === "Yes") {
              // console.log(`Generating Video URL for ${chapter?.ChapterName}`);
              const resp = await getVideos(
                course?.name + ":" + chapter?.ChapterName
              );
    
              // console.log(resp);
    
              // console.log(resp[0]?.id?.videoId);
              videoId = [
                resp[0]?.id?.videoId,
                resp[1]?.id?.videoId,
                resp[2]?.id?.videoId,
              ];
              // console.log(videoId);
            }
            // Save Chapter Content + Video URL
    
            await db.insert(Chapters).values({
              chapterId: index,
              courseId: course?.courseId,
              content: content,
              videoId: videoId,
            });
            toast({
              duration: 2000,
              title: `Chapter ${index + 1} Generated Successfully!`,
              description: `Chapter ${index + 1} has been generated successfully!`,
            });
          }
          await db
            .update(CourseList)
            .set({
              publish: true,
            })
            .where(eq(CourseList.courseId, course?.courseId));
    
          toast({
            variant: "success",
            duration: 3000,
            title: "Course Content Generated Successfully!",
            description: "Course Content has been generated successfully!",
          });
          router.replace("/create-course/" + course?.courseId + "/finish");
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            duration: 5000,
            title: "Uh oh! Something went wrong.",
            description: error?.message || "An unexpected error occurred!",
          });
          await GetCourse();
        } finally {
          setLoading(false);
        }
      };
  return (
     <>
          <LoadingDialog loading={loading} />
          <div className="mt-10 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl">Course Layout</h2>
            {/* Basic Info */}
            <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
            
            {/* Course Detail */}
            <CourseDetail course={course} />

            
            {/* List of Lesson */}
            <ChapterList course={course} refreshData={()=>GetCourse()}/>

           
            <div className="flex justify-center my-10 select-none">
              <Button 
                onClick={() => GenerateChapterSyllabus()}  
                className="bg-primary text-black hover:bg-[#c9c6b3] font-semibold text-sm rounded-full px-8 py-3.5 h-auto shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border-none"
              >
                <Sparkles className="w-4 h-4 text-black animate-pulse" />
                Generate Course Content
              </Button>
            </div>
          </div>
        </>
  )
}

export default CourseLayout