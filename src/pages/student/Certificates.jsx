import { Box, Stack, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { FiAward, FiCompass } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CertificateCard from '../../components/student/CertificateCard';
import { downloadCertificatePdf, viewCertificatePdf } from '../../utils/certificatePdf';

// Mock data — no backend integration yet. Matches the name used on Profile.jsx.
const STUDENT_NAME = 'Aditi Sharma';

// Mock data — no backend integration yet
const CERTIFICATES = [
  {
    id: 1,
    courseTitle: 'Full Stack Web Development',
    mentor: 'Rohan Mehta',
    issuedDate: '12 Jun 2025',
    certificateId: 'PA-WD-2025-0412',
  },
  {
    id: 2,
    courseTitle: 'Spoken English Mastery',
    mentor: 'Kavya Reddy',
    issuedDate: '28 Mar 2025',
    certificateId: 'PA-SE-2025-0187',
  },
];

const EmptyState = () => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '20px',
      py: 8,
      px: 3,
      textAlign: 'center',
    }}
  >
    <Stack spacing={2.5} alignItems="center">
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'rgba(245, 158, 11, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FiAward size={28} color="#D97706" aria-hidden="true" />
      </Box>
      <Stack spacing={0.75}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#1E293B',
          }}
        >
          No certificates yet
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            color: '#64748B',
            maxWidth: 360,
          }}
        >
          Complete a course to earn your first certificate — it'll show up
          here as soon as you finish.
        </Typography>
      </Stack>
      <Button
        component={RouterLink}
        to="/student/courses"
        startIcon={<FiCompass size={16} aria-hidden="true" />}
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: '8px',
          bgcolor: '#2563EB',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          transition: 'background-color 0.2s ease',
          '&:hover': { bgcolor: '#1D4ED8' },
          '&:focus-visible': {
            outline: '2px solid #2563EB',
            outlineOffset: '2px',
          },
        }}
      >
        Go to My Courses
      </Button>
    </Stack>
  </Box>
);

const Certificates = () => {
  const handleView = (cert) => {
    viewCertificatePdf({
      studentName: STUDENT_NAME,
      courseTitle: cert.courseTitle,
      mentor: cert.mentor,
      issuedDate: cert.issuedDate,
      certificateId: cert.certificateId,
    });
  };

  const handleDownload = (cert) => {
    downloadCertificatePdf({
      studentName: STUDENT_NAME,
      courseTitle: cert.courseTitle,
      mentor: cert.mentor,
      issuedDate: cert.issuedDate,
      certificateId: cert.certificateId,
    });
    toast.success(`Downloaded certificate for "${cert.courseTitle}"`);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.375rem',
            color: '#1E293B',
          }}
        >
          My Certificates
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            color: '#64748B',
          }}
        >
          {CERTIFICATES.length > 0
            ? `${CERTIFICATES.length} certificate${CERTIFICATES.length > 1 ? 's' : ''} earned`
            : 'Certificates you earn will appear here'}
        </Typography>
      </Stack>

      {CERTIFICATES.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="row g-3">
          {CERTIFICATES.map((cert, index) => (
            <div key={cert.id} className="col-12 col-sm-6 col-lg-4">
              <CertificateCard
                {...cert}
                index={index}
                onView={() => handleView(cert)}
                onDownload={() => handleDownload(cert)}
              />
            </div>
          ))}
        </div>
      )}
    </Stack>
  );
};

export default Certificates;