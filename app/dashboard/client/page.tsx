'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  MessageSquare, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Star,
  Calendar,
  Camera
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ClientDashboard() {
  const [myAlbums, setMyAlbums] = useState([
    {
      id: 1,
      title: "Wedding Album - Sarah & John",
      editor: "Emma Wilson",
      status: "in_progress",
      progress: 75,
      version: "v2.1",
      lastUpdate: "2 hours ago",
      comments: 3,
      canDownload: false,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Engagement Session",
      editor: "Michael Chen",
      status: "review",
      progress: 100,
      version: "v1.0",
      lastUpdate: "1 day ago",
      comments: 1,
      canDownload: true,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Family Portrait Collection",
      editor: "Emma Wilson",
      status: "completed",
      progress: 100,
      version: "v3.0",
      lastUpdate: "3 days ago",
      comments: 0,
      canDownload: true,
      thumbnail: "/api/placeholder/400/300"
    }
  ]);

  const [activeTab, setActiveTab] = useState('albums');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'revision': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'review': return <Eye className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'revision': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map(f => f.name).join(', ');
      alert(`Selected files: ${fileNames}`);
      // TODO: Implement actual upload logic here
    }
  };

  const handleRequestNewAlbum = () => {
    setActiveTab('requests');
  };

  return (
    <DashboardLayout userRole="client">
      <div className="p-6 space-y-6">
        {/* Hidden file input for upload */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Albums</h1>
            <p className="text-slate-600">Review, approve, and download your custom albums</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
            <Button onClick={handleRequestNewAlbum}>
              <Camera className="h-4 w-4 mr-2" />
              Request New Album
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Albums</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">3 in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Ready to download</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Awaiting your feedback</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.0</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="albums">My Albums</TabsTrigger>
            <TabsTrigger value="feedback">Feedback History</TabsTrigger>
            <TabsTrigger value="requests">New Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="albums" className="space-y-4">
            <div className="grid gap-6">
              {myAlbums.map((album) => (
                <Card key={album.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Album Thumbnail */}
                      <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-slate-400" />
                      </div>
                      
                      {/* Album Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
                            <p className="text-sm text-slate-600 mb-2">
                              Designer: {album.editor}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                              <Calendar className="h-3 w-3" />
                              <span>Updated {album.lastUpdate}</span>
                              <span>•</span>
                              <span>Version {album.version}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(album.status)}>
                              {getStatusIcon(album.status)}
                              <span className="ml-1">{album.status.replace('_', ' ')}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        {album.status !== 'completed' && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-600">Progress</span>
                              <span className="text-sm font-medium">{album.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${album.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {album.comments > 0 && (
                              <div className="flex items-center space-x-1 text-sm text-slate-600">
                                <MessageSquare className="h-4 w-4" />
                                <span>{album.comments} comments</span>
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button className="border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 px-3 py-1 text-sm rounded">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button className="border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 px-3 py-1 text-sm rounded">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Comment
                            </Button>
                            {album.canDownload && (
                              <Button className="px-3 py-1 text-sm rounded">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback History</CardTitle>
                <CardDescription>
                  Your comments and revision requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      album: "Wedding Album - Sarah & John",
                      message: "Love the layout on page 5! Could we make the main photo a bit larger?",
                      response: "Great suggestion! I'll adjust the size and send you an updated version.",
                      time: "2 hours ago",
                      status: "addressed"
                    },
                    {
                      album: "Engagement Session",
                      message: "The color correction looks perfect. Ready to approve this version.",
                      response: "Thank you! The final version is ready for download.",
                      time: "1 day ago",
                      status: "completed"
                    },
                    {
                      album: "Family Portrait Collection",
                      message: "Can we add a few more candid shots from the outdoor session?",
                      response: "I've added 3 more candid shots on pages 8-10. Please review!",
                      time: "3 days ago",
                      status: "completed"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.album}</h4>
                        <Badge className={item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm"><strong>You:</strong> {item.message}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm"><strong>Designer:</strong> {item.response}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Request New Album</CardTitle>
                <CardDescription>
                  Start a new album project with our design team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Manual Design</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Work with our designers for a custom, handcrafted album
                        </p>
                        <Button>Start Manual Project</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Automated Design</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Quick album creation using smart templates
                        </p>
                        <Button>Start Auto Project</Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Need Help Choosing?</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Manual design offers complete customization and creative control</li>
                      <li>• Automated design is faster and perfect for standard layouts</li>
                      <li>• Both options include unlimited revisions and client feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}