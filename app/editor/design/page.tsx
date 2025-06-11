'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Image, 
  Type, 
  Square, 
  Circle, 
  Move, 
  RotateCw,
  Layers,
  Download,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Eye,
  MessageSquare,
  Settings
} from 'lucide-react';

export default function DesignEditor() {
  const [selectedTool, setSelectedTool] = useState('move');
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState([100]);
  const canvasRef = useRef(null);

  const tools = [
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
  ];

  const [albumPages, setAlbumPages] = useState([
    { id: 1, title: 'Cover Page', elements: [], active: true },
    { id: 2, title: 'Page 1-2', elements: [], active: false },
    { id: 3, title: 'Page 3-4', elements: [], active: false },
    { id: 4, title: 'Page 5-6', elements: [], active: false },
  ]);

  const [projectInfo] = useState({
    title: "Sarah & John Wedding Album",
    client: "Sarah Miller",
    deadline: "2025-01-25",
    status: "in_progress",
    version: "v2.1"
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="font-semibold text-lg">{projectInfo.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Client: {projectInfo.client}</span>
              <span>•</span>
              <Badge variant="outline">{projectInfo.version}</Badge>
              <span>•</span>
              <span>Due: {projectInfo.deadline}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Comments
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-white border-r flex flex-col">
          <Tabs defaultValue="tools" className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Design Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      size="sm"
                      className="h-12 flex-col"
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <tool.icon className="h-4 w-4 mb-1" />
                      <span className="text-xs">{tool.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Properties</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-600">Opacity</label>
                    <Slider
                      value={[100]}
                      max={100}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Rotation</label>
                    <Slider
                      value={[0]}
                      max={360}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Photo Library</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow flex items-center justify-center"
                    >
                      <Image className="h-6 w-6 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Templates</h3>
                <div className="space-y-2">
                  {['Classic Layout', 'Modern Grid', 'Artistic Flow'].map((template) => (
                    <div
                      key={template}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="font-medium text-sm">{template}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="layers" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Page Layers</h3>
                <div className="space-y-2">
                  {['Background', 'Photo 1', 'Photo 2', 'Text Layer'].map((layer, index) => (
                    <div
                      key={layer}
                      className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-2">
                        <Layers className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{layer}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2">{zoom[0]}%</span>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Page Settings
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-auto bg-gray-100">
            <div className="max-w-4xl mx-auto">
              <div
                ref={canvasRef}
                className="bg-white shadow-lg rounded-lg aspect-[4/3] relative overflow-hidden"
                style={{ minHeight: '600px' }}
              >
                {/* Canvas Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Palette className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Design Canvas</p>
                    <p className="text-sm">Drag and drop elements to create your album</p>
                  </div>
                </div>
                
                {/* Sample Design Elements */}
                <div className="absolute top-8 left-8 w-32 h-32 bg-blue-200 rounded-lg border-2 border-blue-400 cursor-move flex items-center justify-center">
                  <Image className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className="absolute top-8 right-8 w-48 h-16 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-move">
                  <Type className="h-6 w-6 text-gray-400 mr-2" />
                  <span className="text-gray-600">Sample Text</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Pages */}
        <div className="w-64 bg-white border-l">
          <div className="p-4">
            <h3 className="font-medium mb-4">Album Pages</h3>
            <div className="space-y-3">
              {albumPages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    page.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-2"></div>
                  <div className="text-sm font-medium">{page.title}</div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              <Square className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}