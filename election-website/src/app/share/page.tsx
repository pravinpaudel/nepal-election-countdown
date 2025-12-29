"use client";
import { Countdown } from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Copy, Check, Download, Code, Image as ImageIcon } from "lucide-react";

export default function SharePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  const iframeCode = `<iframe 
  src="${siteUrl}/widget/countdown"
  width="600" 
  height="350"
  frameborder="0"
  title="Nepal Election 2026 Countdown"
  style="border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);"
></iframe>`;

  const markdownCode = `[![Nepal Election 2026 Countdown](${siteUrl}/badges/banner.svg)](${siteUrl})`;

  const htmlImageCode = `<a href="${siteUrl}">
  <img src="${siteUrl}/badges/banner.svg" alt="Nepal Election 2026 - I'm Ready to Vote" />
</a>`;

  const badges = [
    {
      id: 'round-en-red',
      name: 'Round Badge - Red',
      preview: '/badges/round-red.svg',
      downloads: [
        { format: 'SVG', url: '/badges/round-red.svg' },
        { format: 'PNG', url: '/badges/round-red-512.png' },
      ]
    },
    {
      id: 'round-en-blue',
      name: 'Round Badge - Blue',
      preview: '/badges/round-blue.svg',
      downloads: [
        { format: 'SVG', url: '/badges/round-blue.svg' },
        { format: 'PNG', url: '/badges/round-blue-512.png' },
      ]
    },
    {
      id: 'square-gradient',
      name: 'Square Badge - Gradient',
      preview: '/badges/square-gradient.svg',
      downloads: [
        { format: 'SVG', url: '/badges/square-gradient.svg' },
        { format: 'PNG', url: '/badges/square-gradient-512.png' },
      ]
    },
    {
      id: 'banner',
      name: 'Banner Badge',
      preview: '/badges/banner.svg',
      downloads: [
        { format: 'SVG', url: '/badges/banner.svg' },
        { format: 'PNG', url: '/badges/banner-1200.png' },
      ]
    },
    {
      id: 'sticker-ready',
      name: 'Ready to Vote Sticker',
      preview: '/badges/sticker-ready.svg',
      downloads: [
        { format: 'SVG', url: '/badges/sticker-ready.svg' },
        { format: 'PNG', url: '/badges/sticker-ready-512.png' },
      ]
    },
    {
      id: 'minimal-circle',
      name: 'Minimal Circle',
      preview: '/badges/minimal-circle.svg',
      downloads: [
        { format: 'SVG', url: '/badges/minimal-circle.svg' },
        { format: 'PNG', url: '/badges/minimal-circle-512.png' },
      ]
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-base sm:text-xl font-semibold text-gray-900 hover:text-gray-700">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Share & Spread Awareness
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Help spread the word about Nepal's election. Download badges or embed the countdown on your website.
            </p>
          </div>

          {/* Countdown Widget Section */}
          <section className="mb-16 sm:mb-24">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Embed Countdown Widget</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Preview */}
              <div className="hidden sm:block">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                  <iframe
                    src="/widget/countdown"
                    className="w-full h-[300px] lg:h-[350px] rounded-lg"
                    title="Countdown Widget Preview"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  The widget updates automatically in real-time. Perfect for blogs, websites, and social media.
                </p>
              </div>
              
              {/* Code snippets */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700">Iframe Embed Code</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(iframeCode, 'iframe')}
                      className="gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0"
                    >
                      {copiedId === 'iframe' ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{iframeCode}</code>
                  </pre>
                  <p className="text-xs text-gray-500 mt-2">
                    Works on WordPress, Medium, Blogger, and most platforms
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700">Markdown (GitHub, Reddit)</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(markdownCode, 'markdown')}
                      className="gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0"
                    >
                      {copiedId === 'markdown' ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{markdownCode}</code>
                  </pre>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700">HTML Image Badge</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(htmlImageCode, 'html')}
                      className="gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0"
                    >
                      {copiedId === 'html' ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{htmlImageCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Badges Section */}
          <section>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Download Voting Badges</h2>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
              Show your support with these downloadable badges. Perfect for social media profiles, avatars, and stories.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 sm:p-8">
                    <img 
                      src={badge.preview} 
                      alt={badge.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{badge.name}</h3>
                    <div className="flex gap-2">
                      {badge.downloads.map((download) => (
                        <a
                          key={download.format}
                          href={download.url}
                          download
                          className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          {download.format}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mt-16 sm:mt-24 bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Usage Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">✅ Allowed Uses:</h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• Personal websites and blogs</li>
                  <li>• Social media profiles and posts</li>
                  <li>• Community forums and groups</li>
                  <li>• Educational purposes</li>
                  <li>• Non-profit civic engagement</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">❌ Not Allowed:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Political party endorsements</li>
                  <li>• Commercial advertisements</li>
                  <li>• Misleading modifications</li>
                  <li>• Reselling or redistribution</li>
                  <li>• Partisan campaign materials</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
