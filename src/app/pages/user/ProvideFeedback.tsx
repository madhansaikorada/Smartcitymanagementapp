import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Star, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Feedback {
  id: string;
  subject: string;
  category: string;
  rating: number;
  message: string;
  submittedDate: string;
  status: 'submitted' | 'reviewed';
}

export default function ProvideFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      subject: 'Excellent Public Transportation',
      category: 'Transportation',
      rating: 5,
      message: 'The new bus routes have significantly improved my daily commute. Thank you!',
      submittedDate: '2026-02-15',
      status: 'reviewed',
    },
    {
      id: '2',
      subject: 'Park Maintenance',
      category: 'Parks & Recreation',
      rating: 4,
      message: 'Central Park looks beautiful, but could use more benches.',
      submittedDate: '2026-02-18',
      status: 'submitted',
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({
    subject: '',
    category: '',
    rating: 0,
    message: '',
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedback.subject || !newFeedback.category || !newFeedback.message || newFeedback.rating === 0) {
      toast.error('Please fill in all required fields and provide a rating');
      return;
    }

    const feedback: Feedback = {
      id: Date.now().toString(),
      subject: newFeedback.subject,
      category: newFeedback.category,
      rating: newFeedback.rating,
      message: newFeedback.message,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
    };

    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({
      subject: '',
      category: '',
      rating: 0,
      message: '',
    });
    toast.success('Thank you for your feedback!');
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (interactive ? (hoveredRating || newFeedback.rating) : rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer' : ''}`}
            onClick={() => interactive && setNewFeedback({ ...newFeedback, rating: star })}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Provide Feedback</h1>
        <p className="text-gray-600">Share your thoughts on city services and amenities</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Help us improve our city services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={newFeedback.subject}
                  onChange={(e) => setNewFeedback({ ...newFeedback, subject: e.target.value })}
                  placeholder="What is your feedback about?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newFeedback.category}
                  onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex items-center gap-2">
                  {renderStars(newFeedback.rating, true)}
                  <span className="text-sm text-gray-600">
                    {newFeedback.rating > 0 ? `${newFeedback.rating} / 5` : 'Select rating'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback *</Label>
                <Textarea
                  id="message"
                  value={newFeedback.message}
                  onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                  placeholder="Share your thoughts, suggestions, or appreciation"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Your Feedback History</h2>
            <Badge variant="outline" className="gap-1">
              <MessageSquare className="w-3 h-3" />
              {feedbacks.length} Total
            </Badge>
          </div>

          {feedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{feedback.subject}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{feedback.category}</Badge>
                      <Badge className={
                        feedback.status === 'reviewed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }>
                        {feedback.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(feedback.rating)}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700">{feedback.message}</p>
                <div className="pt-2 text-sm text-gray-600">
                  <p><span className="font-medium">Submitted:</span> {new Date(feedback.submittedDate).toLocaleDateString()}</p>
                </div>
                {feedback.status === 'reviewed' && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Thank you for your feedback! We appreciate your input.</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {feedbacks.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No feedback submitted yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
