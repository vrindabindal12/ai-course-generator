import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { HiChevronDoubleRight, HiOutlineClipboardList, HiCheckCircle } from "react-icons/hi";
import "./youtubeAdjustments.css";
import { Button } from "@/components/ui/button";

function ChapterContent({ chapter, content, handleSideBarFunction }) {
  const [selectedVideo, setSelectedVideo] = useState(0);

  // Function to render YouTube videos
  const renderYouTubeVideo = () => {
    if (!content?.videoId) return null;

    const videoId = Array.isArray(content.videoId)
      ? content.videoId[selectedVideo]
      : content.videoId;

    return (
      <div className="video-responsive my-6 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg">
        <YouTube videoId={videoId} opts={{ playerVars: { autoplay: 0 } }} />
      </div>
    );
  };

  // Function to render video buttons
  const renderVideoButtons = () => {
    if (!Array.isArray(content?.videoId)) return null;

    return content.videoId.map((_, index) => (
      <button
        key={index}
        onClick={() => setSelectedVideo(index)}
        className={`px-4 py-2 rounded-full text-xs font-semibold select-none border transition-all duration-200 cursor-pointer ${
          selectedVideo === index
            ? "bg-primary text-black border-transparent shadow-md shadow-primary/10"
            : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white"
        }`}
      >
        Video {index + 1}
      </button>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      {/* Dynamic Markdown Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-content p {
          color: #a3a3a3; /* text-neutral-400 */
          font-size: 0.875rem; /* text-sm */
          line-height: 1.65;
          margin-top: 0.85rem;
          margin-bottom: 0.85rem;
        }
        .markdown-content ul, .markdown-content ol {
          margin-left: 1.5rem;
          margin-top: 0.6rem;
          margin-bottom: 0.6rem;
          list-style-type: disc;
          color: #d4d4d4;
        }
        .markdown-content li {
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .markdown-content strong {
          color: #E1E0CC;
          font-weight: 600;
        }
        .markdown-content code {
          background-color: #1e1e1e;
          color: #DEDBC8;
          padding: 0.15rem 0.35rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.85em;
        }
      `}} />

      {/* Sidebar Toggle (Mobile Only) */}
      <button
        onClick={() => handleSideBarFunction(true)}
        className="md:hidden mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all select-none cursor-pointer"
      >
        <HiChevronDoubleRight className="w-4 h-4 text-primary animate-pulse" />
        <span>Chapters</span>
      </button>

      {/* Chapter Information */}
      <div className="mb-6">
        <h2 className="font-medium text-2xl md:text-3xl text-[#E1E0CC] tracking-tight">{chapter?.ChapterName}</h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">{chapter?.About}</p>
      </div>

      {/* Video Section */}
      {renderYouTubeVideo()}

      {/* Responsive Video Buttons */}
      <div className="flex flex-wrap gap-2.5 my-5 justify-center w-full">
        {renderVideoButtons()}
      </div>

      {/* Alternative Video Notice Card */}
      {Array.isArray(content?.videoId) && content.videoId.length > 1 && (
        <div className="bg-[#101010] border border-neutral-900 rounded-2xl p-4 my-6 text-center max-w-xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
          <p className="text-xs text-neutral-400 leading-relaxed relative z-10">
            🎥 <strong>Alternative Video Sync:</strong> This chapter supports multiple synced lessons. If you'd like a different explanation or instructor style, toggle the buttons above.
          </p>
        </div>
      )}

      {/* Content Section */}
      <div className="mt-8 flex flex-col gap-4">
        {content?.content?.chapters?.map((item, index) => (
          <div 
            key={index} 
            className="p-6 bg-[#101010] border border-neutral-900 hover:border-neutral-800 transition-all duration-300 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 noise-overlay opacity-[0.01] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-medium text-base sm:text-lg text-[#E1E0CC] flex gap-2 items-center tracking-tight border-b border-neutral-900 pb-3 mb-4">
                <HiCheckCircle className="text-primary w-5 h-5 shrink-0" />
                <span>{item?.title}</span>
              </h3>
              
              <div className="markdown-content leading-relaxed">
                <ReactMarkdown>{item?.explanation}</ReactMarkdown>
              </div>

              {/* Code Example Section */}
              {item?.codeExample && (
                <div className="p-4 bg-[#080808] border border-neutral-900 text-neutral-300 rounded-xl mt-4 relative group">
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-2 mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-semibold">Code Sample</span>
                    <button
                      onClick={async () =>
                        await navigator.clipboard.writeText(
                          item.codeExample.replace(/<\/?precode>/g, "")
                        )
                      }
                      title="Copy code"
                      className="text-neutral-500 hover:text-primary transition-colors cursor-pointer p-1 hover:bg-neutral-900 rounded-md"
                    >
                      <HiOutlineClipboardList className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="break-words whitespace-pre-wrap overflow-auto font-mono text-xs leading-relaxed text-neutral-300 max-h-[400px]">
                    <code>{item.codeExample.replace(/<\/?precode>/g, "")}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
