'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function EditorDashboard() {
  const [myProjects, setMyProjects] = useState([
    {
      id: 1,
      title: "Sarah & John Wedding Album",
      client: "Sarah Miller",
      status: "in_progress",
      progress: 75,
      deadline: "2025-01-25",
      type: "manual",
      priority: "high",
      comments: 3,
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      title: "Family Portrait Collection",
      client: "Johnson Family",
      status: "revision",
      progress: 60,
      deadline: "2025-01-30",
      type: "manual",
      priority: "medium",
      comments: 7,
      lastUpdate: "1 day ago"
    },
    {
      id: 3,
      title: "Corporate Headshots",
      client: "Tech Startup Inc",
      status: "review",
      progress: 100,
      deadline: "2025-01-22",
      type: "manual",
      priority: "low",
      comments: 1,
      lastUpdate: "3 hours ago"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-green-100 text-green-800';
      case 'revision': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userRole="editor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Editor Dashboard</h1>
            <p className="text-slate-600">Manage your album projects and creative workflow</p>
          </div>
          <div className="flex space-x-3">
            <Button className="border">
              <Eye className="h-4 w-4 mr-2" />
              Preview Mode
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Awaiting client feedback</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Client satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="feedback">Client Feedback</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Active Projects</h2>
              <Button className="border">Sort by Deadline</Button>
            </div>
            
            <div className="space-y-4">
              {myProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Client: {project.client}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {project.deadline}</span>
                          <span>•</span>
                          <span>Updated {project.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-slate-600">
                          <MessageSquare className="h-4 w-4" />
                          <span>{project.comments} comments</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="border">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comments
                        </Button>
                        <Button>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Design Templates</h2>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Classic Wedding", layouts: 12, usage: 45 },
                { name: "Modern Portrait", layouts: 8, usage: 32 },
                { name: "Corporate Event", layouts: 6, usage: 18 },
                { name: "Family Collection", layouts: 10, usage: 28 },
                { name: "Engagement Session", layouts: 7, usage: 15 },
                { name: "Maternity Album", layouts: 9, usage: 22 }
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center">
                      <Palette className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div>{template.layouts} layouts</div>
                      <div>Used {template.usage} times</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Client Feedback</CardTitle>
                <CardDescription>
                  Comments and revision requests from your clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      project: "Sarah & John Wedding Album",
                      client: "Sarah Miller",
                      message: "Love the layout on page 5! Could we make the main photo a bit larger?",
                      time: "2 hours ago",
                      status: "pending"
                    },
                    {
                      project: "Family Portrait Collection",
                      client: "Johnson Family",
                      message: "The color correction looks perfect. Ready to approve this version.",
                      time: "1 day ago",
                      status: "approved"
                    },
                    {
                      project: "Corporate Headshots",
                      client: "Tech Startup Inc",
                      message: "Can we add the company logo to the cover page?",
                      time: "2 days ago",
                      status: "pending"
                    }
                  ].map((feedback, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{feedback.project}</h4>
                        <Badge className={feedback.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {feedback.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{feedback.message}</p>
                      <div className="text-xs text-slate-500">
                        {feedback.client} • {feedback.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Your project schedule and important dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Jan 20", project: "Corporate Event Album", status: "Due Today", urgent: true },
                    { date: "Jan 22", project: "Corporate Headshots", status: "Due in 2 days", urgent: false },
                    { date: "Jan 25", project: "Sarah & John Wedding Album", status: "Due in 5 days", urgent: false },
                    { date: "Jan 30", project: "Family Portrait Collection", status: "Due in 10 days", urgent: false }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${item.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.project}</h4>
                          <p className="text-sm text-slate-600">{item.date}</p>
                        </div>
                        <Badge className={item.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}