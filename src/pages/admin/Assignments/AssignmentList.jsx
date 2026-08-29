import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Chip, MenuItem, Select, Stack } from '@mui/material'
import { FiEye, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'
import {
  deleteAssignment,
  getAssignments,
} from '../../../services/assessmentService'
import { getCourses } from '../../../services/courseService'

const AssignmentList = () => {
  const navigate = useNavigate()

  const [assignments, setAssignments] = useState([])
  const [courses, setCourses] = useState([])
  const [status, setStatus] = useState('All')
  const [courseId, setCourseId] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteItem, setDeleteItem] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [assignmentData, courseData] = await Promise.all([
        getAssignments(),
        getCourses(),
      ])

      setAssignments(assignmentData)
      setCourses(courseData)
    } catch (err) {
      setError(err.message || 'Failed to load assignments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const statusMatch =
        status === 'All' || assignment.status === status

      const courseMatch =
        courseId === 'All' || assignment.courseId === courseId

      return statusMatch && courseMatch
    })
  }, [assignments, status, courseId])

  const handleDelete = async () => {
    if (!deleteItem) return

    try {
      setDeleting(true)
      setError('')

      await deleteAssignment(deleteItem.id)

      setAssignments((current) =>
        current.filter((item) => item.id !== deleteItem.id)
      )

      setDeleteItem(null)
    } catch (err) {
      setError(err.message || 'Failed to delete assignment')
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    {
      id: 'title',
      label: 'Assignment',
      minWidth: 240,
      render: (value, row) => (
        <Box>
          <Box
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              mb: 0.25,
            }}
          >
            {value}
          </Box>

          <Box
            sx={{
              fontSize: '0.75rem',
              color: '#64748B',
            }}
          >
            {row.courseName}
          </Box>
        </Box>
      ),
    },
    {
      id: 'dueDate',
      label: 'Due Date',
      minWidth: 140,
      render: (value) => value || '-',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 600,
            bgcolor:
              value === 'Published'
                ? '#ECFDF5'
                : '#F1F5F9',
            color:
              value === 'Published'
                ? '#047857'
                : '#64748B',
          }}
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'right',
      minWidth: 180,
      render: (_, row) => (
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FiEye size={15} />}
            onClick={() =>
              navigate(`/admin/assignments/${row.id}`)
            }
            sx={{
              textTransform: 'none',
              borderColor: '#CBD5E1',
              color: '#334155',
            }}
          >
            View
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={<FiTrash2 size={15} />}
            onClick={() => setDeleteItem(row)}
            sx={{
              textTransform: 'none',
              borderColor: '#FCA5A5',
              color: '#DC2626',
              '&:hover': {
                borderColor: '#EF4444',
                backgroundColor: '#FEF2F2',
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Assignments"
        subtitle="Create and manage coursework and submissions."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Assignments' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus size={17} />}
            onClick={() =>
              navigate('/admin/assignments/create')
            }
            sx={{
              textTransform: 'none',
              bgcolor: '#2563EB',
              '&:hover': {
                bgcolor: '#1D4ED8',
              },
            }}
          >
            Create Assignment
          </Button>
        }
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Select
          size="small"
          value={courseId}
          onChange={(event) =>
            setCourseId(event.target.value)
          }
          displayEmpty
          sx={{
            minWidth: { xs: '100%', sm: 220 },
            bgcolor: '#FFFFFF',
          }}
        >
          <MenuItem value="All">
            All Courses
          </MenuItem>

          {courses.map((course) => (
            <MenuItem
              key={course.id}
              value={course.id}
            >
              {course.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          sx={{
            minWidth: { xs: '100%', sm: 160 },
            bgcolor: '#FFFFFF',
          }}
        >
          <MenuItem value="All">
            All Statuses
          </MenuItem>
          <MenuItem value="Draft">
            Draft
          </MenuItem>
          <MenuItem value="Published">
            Published
          </MenuItem>
        </Select>
      </Stack>

      {error && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#FEF2F2',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>{error}</Box>

          <Button
            size="small"
            onClick={loadData}
            sx={{
              textTransform: 'none',
              color: '#B91C1C',
            }}
          >
            Retry
          </Button>
        </Box>
      )}

      <DataTable
        columns={columns}
        rows={filteredAssignments}
        searchKey="title"
        emptyText="No assignments found."
      />

      <AdminModal
        open={Boolean(deleteItem)}
        onClose={() =>
          !deleting && setDeleteItem(null)
        }
        title="Delete Assignment"
      >
        <Box
          sx={{
            color: '#475569',
            mb: 3,
          }}
        >
          Are you sure you want to delete{' '}
          <strong>{deleteItem?.title}</strong>?
          This action cannot be undone.
        </Box>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button
            variant="outlined"
            onClick={() => setDeleteItem(null)}
            disabled={deleting}
            sx={{
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={deleting}
            sx={{
              textTransform: 'none',
              bgcolor: '#DC2626',
              '&:hover': {
                bgcolor: '#B91C1C',
              },
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Stack>
      </AdminModal>
    </Box>
  )
}

export default AssignmentList