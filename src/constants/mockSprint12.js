export const mockEnrollments = [
  { id: 'enr1', studentId: 'stu1', studentName: 'John Doe', courseId: 'c1', courseName: 'Python for Beginners', date: '2026-09-01', status: 'Active' },
  { id: 'enr2', studentId: 'stu2', studentName: 'Jane Smith', courseId: 'c2', courseName: 'Class 12 Physics Revision', date: '2026-09-02', status: 'Completed' }
];

export const mockPayments = [
  { id: 'pay1', studentId: 'stu1', studentName: 'John Doe', courseId: 'c1', courseName: 'Python for Beginners', amount: 499, status: 'Success', date: '2026-09-01', notes: 'Paid via UPI' },
  { id: 'pay2', studentId: 'stu2', studentName: 'Jane Smith', courseId: 'c2', courseName: 'Class 12 Physics Revision', amount: 999, status: 'Pending', date: '2026-09-02', notes: 'Bank transfer processing' }
];

export const mockCoupons = [
  { id: 'coup1', code: 'WELCOME50', discount: 50, expiry: '2026-12-31', status: 'Active' },
  { id: 'coup2', code: 'DIWALI20', discount: 20, expiry: '2026-10-31', status: 'Expired' }
];

export const mockMarks = [
  { id: 'mk1', studentName: 'John Doe', courseName: 'Python for Beginners', assessment: 'Variables Quiz', score: '18/20', date: '2026-09-10' },
  { id: 'mk2', studentName: 'Jane Smith', courseName: 'Class 12 Physics Revision', assessment: 'Optics Midterm', score: '85/100', date: '2026-09-12' }
];

export const mockAttendance = [
  { id: 'att1', date: '2026-09-15', courseName: 'Python for Beginners', studentName: 'John Doe', status: 'Present' },
  { id: 'att2', date: '2026-09-15', courseName: 'Class 12 Physics Revision', studentName: 'Jane Smith', status: 'Absent' }
];