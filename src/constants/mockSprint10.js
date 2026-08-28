export const mockCourses = [
  { id: 'c1', title: 'Python for Beginners' },
  { id: 'c2', title: 'Class 12 Physics Revision' }
];

export const mockMaterials = [
  { id: '1', title: 'Python Basics Chapter 1', type: 'PDF', courseId: 'c1', date: '2026-08-28', status: 'Published', url: '' },
  { id: '2', title: 'Thermodynamics Notes', type: 'Notes', courseId: 'c2', date: '2026-08-25', status: 'Draft', url: '' }
];

export const mockLiveClasses = [
  { id: '1', name: 'Intro to Variables', teacherId: '1', courseId: 'c1', date: '2026-08-30', startTime: '10:00', endTime: '11:00', status: 'Scheduled', meetingLink: 'https://zoom.us/j/123456789' },
  { id: '2', name: 'Optics Q&A', teacherId: '2', courseId: 'c2', date: '2026-09-02', startTime: '14:00', endTime: '15:30', status: 'Completed', meetingLink: 'https://meet.google.com/abc-defg-hij' }
];