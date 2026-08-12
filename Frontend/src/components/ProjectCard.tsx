import React from 'react';
import { ExternalLink, Download, Star, GitFork, Calendar, Code } from 'lucide-react';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    hashtags: string[];
    repo: string;
    category: string;
    viewRepoUrl: string;
    downloadUrl: string;
  };
  layout?: 'horizontal' | 'vertical';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, layout = 'vertical' }) => {
  const mockStats = {
    stars: Math.floor(Math.random() * 100) + 10,
    forks: Math.floor(Math.random() * 50) + 5,
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-md transition-all duration-200 group">
      {/* Compact Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-mono">{project.repo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{mockStats.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            <span>{mockStats.forks}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-1">
          {project.hashtags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                       border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              {tag.replace('#', '')}
            </span>
          ))}
          {project.hashtags.length > 3 && (
            <span className="inline-block px-2 py-1 text-gray-500 text-xs">
              +{project.hashtags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-2">
        <a
          href={project.viewRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm 
                   hover:bg-gray-800 transition-colors rounded flex-1 justify-center text-xs"
        >
          <ExternalLink className="w-3 h-3" />
          Code
        </a>

        <a
          href={project.downloadUrl}
          download
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm 
                   hover:border-gray-400 hover:bg-gray-50 transition-colors rounded flex-1 justify-center text-xs"
        >
          <Download className="w-3 h-3" />
          PDF
        </a>
      </div>
    </div>
  );
};