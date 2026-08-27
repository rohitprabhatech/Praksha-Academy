import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    FiAlertTriangle,
    FiArrowLeft,
    FiPlus,
    FiTrash2,
} from 'react-icons/fi';

import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import AdminSurface from '../../../components/admin/common/AdminSurface';

import CurriculumTree from './CurriculumTree';

import {
    getCourseById,
    getCurriculum,
    saveCurriculum,
} from '../../../services/courseService';

const Curriculum = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================================================
    // Curriculum
    // ============================================================

    const [modules, setModules] = useState([]);

    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] =
        useState(false);

    // ============================================================
    // Module modal
    // ============================================================

    const [isModuleModalOpen, setIsModuleModalOpen] =
        useState(false);

    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleError, setModuleError] = useState('');

    const [editingModuleId, setEditingModuleId] =
        useState(null);

    // ============================================================
    // Chapter modal
    // ============================================================

    const [isChapterModalOpen, setIsChapterModalOpen] =
        useState(false);

    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterError, setChapterError] = useState('');

    const [selectedModuleId, setSelectedModuleId] =
        useState(null);

    const [editingChapterId, setEditingChapterId] =
        useState(null);

    // ============================================================
    // Lesson modal
    // ============================================================

    const [isLessonModalOpen, setIsLessonModalOpen] =
        useState(false);

    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonDuration, setLessonDuration] =
        useState('');

    const [lessonType, setLessonType] =
        useState('lesson');

    const [lessonError, setLessonError] = useState('');

    const [selectedLessonModuleId, setSelectedLessonModuleId] =
        useState(null);

    const [selectedChapterId, setSelectedChapterId] =
        useState(null);

    const [editingLessonId, setEditingLessonId] =
        useState(null);

    // ============================================================
    // Delete confirmation
    // ============================================================

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [deleteTarget, setDeleteTarget] =
        useState(null);

    // ============================================================
    // Load course
    // ============================================================

    const fetchCourse = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const courseData = await getCourseById(id);
            const curriculumData = await getCurriculum(id);

            setCourse(courseData);
            setModules(curriculumData);
            setHasUnsavedChanges(false);
        } catch (err) {
            console.error('Failed to load course:', err);

            setCourse(null);
            setModules([]);

            setError(
                err?.message ||
                    'Failed to load curriculum.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    // ============================================================
    // MODULE
    // ============================================================

    const openModuleModal = () => {
        setEditingModuleId(null);
        setModuleTitle('');
        setModuleError('');
        setIsModuleModalOpen(true);
    };

    const openEditModuleModal = (module) => {
        setEditingModuleId(module.id);
        setModuleTitle(module.title);
        setModuleError('');
        setIsModuleModalOpen(true);
    };

    const closeModuleModal = () => {
        setIsModuleModalOpen(false);
        setEditingModuleId(null);
        setModuleTitle('');
        setModuleError('');
    };

    const handleSaveModule = () => {
        const trimmedTitle = moduleTitle.trim();

        if (!trimmedTitle) {
            setModuleError(
                'Module title is required.'
            );
            return;
        }

        if (editingModuleId) {
            setModules((currentModules) =>
                currentModules.map((module) =>
                    module.id === editingModuleId
                        ? {
                              ...module,
                              title: trimmedTitle,
                          }
                        : module
                )
            );

            setHasUnsavedChanges(true);

            closeModuleModal();

            toast.success(
                'Module updated successfully.'
            );

            return;
        }

        const newModule = {
            id: `module-${Date.now()}`,
            title: trimmedTitle,
            chapters: [],
        };

        setModules((currentModules) => [
            ...currentModules,
            newModule,
        ]);

        setHasUnsavedChanges(true);

        closeModuleModal();

        toast.success(
            'Module added successfully.'
        );
    };

    // ============================================================
    // CHAPTER
    // ============================================================

    const openChapterModal = (moduleId) => {
        setSelectedModuleId(moduleId);
        setEditingChapterId(null);

        setChapterTitle('');
        setChapterError('');

        setIsChapterModalOpen(true);
    };

    const openEditChapterModal = (
        moduleId,
        chapter
    ) => {
        setSelectedModuleId(moduleId);
        setEditingChapterId(chapter.id);

        setChapterTitle(chapter.title);
        setChapterError('');

        setIsChapterModalOpen(true);
    };

    const closeChapterModal = () => {
        setIsChapterModalOpen(false);

        setSelectedModuleId(null);
        setEditingChapterId(null);

        setChapterTitle('');
        setChapterError('');
    };

    const handleSaveChapter = () => {
        const trimmedTitle = chapterTitle.trim();

        if (!trimmedTitle) {
            setChapterError(
                'Chapter title is required.'
            );
            return;
        }

        if (editingChapterId) {
            setModules((currentModules) =>
                currentModules.map((module) => {
                    if (
                        module.id !==
                        selectedModuleId
                    ) {
                        return module;
                    }

                    return {
                        ...module,

                        chapters:
                            module.chapters.map(
                                (chapter) =>
                                    chapter.id ===
                                    editingChapterId
                                        ? {
                                              ...chapter,
                                              title: trimmedTitle,
                                          }
                                        : chapter
                            ),
                    };
                })
            );

            setHasUnsavedChanges(true);

            closeChapterModal();

            toast.success(
                'Chapter updated successfully.'
            );

            return;
        }

        const newChapter = {
            id: `chapter-${Date.now()}`,
            title: trimmedTitle,
            lessons: [],
        };

        setModules((currentModules) =>
            currentModules.map((module) => {
                if (
                    module.id !==
                    selectedModuleId
                ) {
                    return module;
                }

                return {
                    ...module,

                    chapters: [
                        ...module.chapters,
                        newChapter,
                    ],
                };
            })
        );

        setHasUnsavedChanges(true);

        closeChapterModal();

        toast.success(
            'Chapter added successfully.'
        );
    };

    // ============================================================
    // LESSON
    // ============================================================

    const openLessonModal = (
        moduleId,
        chapterId
    ) => {
        setSelectedLessonModuleId(moduleId);
        setSelectedChapterId(chapterId);

        setEditingLessonId(null);

        setLessonTitle('');
        setLessonDuration('');
        setLessonType('lesson');
        setLessonError('');

        setIsLessonModalOpen(true);
    };

    const openEditLessonModal = (
        moduleId,
        chapterId,
        lesson
    ) => {
        setSelectedLessonModuleId(moduleId);
        setSelectedChapterId(chapterId);

        setEditingLessonId(lesson.id);

        setLessonTitle(lesson.title);
        setLessonDuration(
            lesson.duration || ''
        );

        setLessonType(
            lesson.type || 'lesson'
        );

        setLessonError('');

        setIsLessonModalOpen(true);
    };

    const closeLessonModal = () => {
        setIsLessonModalOpen(false);

        setSelectedLessonModuleId(null);
        setSelectedChapterId(null);
        setEditingLessonId(null);

        setLessonTitle('');
        setLessonDuration('');
        setLessonType('lesson');
        setLessonError('');
    };

    const handleSaveLesson = () => {
        const trimmedTitle = lessonTitle.trim();

        if (!trimmedTitle) {
            setLessonError(
                'Lesson title is required.'
            );
            return;
        }

        if (editingLessonId) {
            setModules((currentModules) =>
                currentModules.map((module) => {
                    if (
                        module.id !==
                        selectedLessonModuleId
                    ) {
                        return module;
                    }

                    return {
                        ...module,

                        chapters:
                            module.chapters.map(
                                (chapter) => {
                                    if (
                                        chapter.id !==
                                        selectedChapterId
                                    ) {
                                        return chapter;
                                    }

                                    return {
                                        ...chapter,

                                        lessons:
                                            chapter.lessons.map(
                                                (lesson) =>
                                                    lesson.id ===
                                                    editingLessonId
                                                        ? {
                                                              ...lesson,
                                                              title: trimmedTitle,
                                                              duration:
                                                                  lessonDuration.trim(),
                                                              type: lessonType,
                                                          }
                                                        : lesson
                                            ),
                                    };
                                }
                            ),
                    };
                })
            );

            setHasUnsavedChanges(true);

            closeLessonModal();

            toast.success(
                'Lesson updated successfully.'
            );

            return;
        }

        const newLesson = {
            id: `lesson-${Date.now()}`,
            title: trimmedTitle,
            duration:
                lessonDuration.trim(),
            type: lessonType,
        };

        setModules((currentModules) =>
            currentModules.map((module) => {
                if (
                    module.id !==
                    selectedLessonModuleId
                ) {
                    return module;
                }

                return {
                    ...module,

                    chapters:
                        module.chapters.map(
                            (chapter) => {
                                if (
                                    chapter.id !==
                                    selectedChapterId
                                ) {
                                    return chapter;
                                }

                                return {
                                    ...chapter,

                                    lessons: [
                                        ...chapter.lessons,
                                        newLesson,
                                    ],
                                };
                            }
                        ),
                };
            })
        );

        setHasUnsavedChanges(true);

        closeLessonModal();

        toast.success(
            'Lesson added successfully.'
        );
    };

    // ============================================================
    // DELETE
    // ============================================================

    const openDeleteModuleDialog = (
        module
    ) => {
        setDeleteTarget({
            type: 'module',
            moduleId: module.id,
            title: module.title,
            hasChildren:
                module.chapters.length > 0,
        });

        setDeleteDialogOpen(true);
    };

    const openDeleteChapterDialog = (
        moduleId,
        chapter
    ) => {
        setDeleteTarget({
            type: 'chapter',
            moduleId,
            chapterId: chapter.id,
            title: chapter.title,
            hasChildren:
                chapter.lessons.length > 0,
        });

        setDeleteDialogOpen(true);
    };

    const openDeleteLessonDialog = (
        moduleId,
        chapterId,
        lesson
    ) => {
        setDeleteTarget({
            type: 'lesson',
            moduleId,
            chapterId,
            lessonId: lesson.id,
            title: lesson.title,
            hasChildren: false,
        });

        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        if (deleteTarget.type === 'module') {
            setModules((currentModules) =>
                currentModules.filter(
                    (module) =>
                        module.id !==
                        deleteTarget.moduleId
                )
            );

            setHasUnsavedChanges(true);

            toast.success(
                'Module deleted successfully.'
            );
        }

        if (deleteTarget.type === 'chapter') {
            setModules((currentModules) =>
                currentModules.map((module) => {
                    if (
                        module.id !==
                        deleteTarget.moduleId
                    ) {
                        return module;
                    }

                    return {
                        ...module,

                        chapters:
                            module.chapters.filter(
                                (chapter) =>
                                    chapter.id !==
                                    deleteTarget.chapterId
                            ),
                    };
                })
            );

            setHasUnsavedChanges(true);

            toast.success(
                'Chapter deleted successfully.'
            );
        }

        if (deleteTarget.type === 'lesson') {
            setModules((currentModules) =>
                currentModules.map((module) => {
                    if (
                        module.id !==
                        deleteTarget.moduleId
                    ) {
                        return module;
                    }

                    return {
                        ...module,

                        chapters:
                            module.chapters.map(
                                (chapter) => {
                                    if (
                                        chapter.id !==
                                        deleteTarget.chapterId
                                    ) {
                                        return chapter;
                                    }

                                    return {
                                        ...chapter,

                                        lessons:
                                            chapter.lessons.filter(
                                                (lesson) =>
                                                    lesson.id !==
                                                    deleteTarget.lessonId
                                            ),
                                    };
                                }
                            ),
                    };
                })
            );

            setHasUnsavedChanges(true);

            toast.success(
                'Lesson deleted successfully.'
            );
        }

        closeDeleteDialog();
    };

    // ============================================================
    // MOVE / REORDER
    // ============================================================

    const moveModule = (
        moduleIndex,
        direction
    ) => {
        setModules((currentModules) => {
            const newModules = [
                ...currentModules,
            ];

            const targetIndex =
                direction === 'up'
                    ? moduleIndex - 1
                    : moduleIndex + 1;

            if (
                targetIndex < 0 ||
                targetIndex >=
                    newModules.length
            ) {
                return currentModules;
            }

            [
                newModules[moduleIndex],
                newModules[targetIndex],
            ] = [
                newModules[targetIndex],
                newModules[moduleIndex],
            ];

            return newModules;
        });

        setHasUnsavedChanges(true);
    };

    const moveChapter = (
        moduleId,
        chapterIndex,
        direction
    ) => {
        setModules((currentModules) =>
            currentModules.map((module) => {
                if (
                    module.id !== moduleId
                ) {
                    return module;
                }

                const chapters = [
                    ...module.chapters,
                ];

                const targetIndex =
                    direction === 'up'
                        ? chapterIndex - 1
                        : chapterIndex + 1;

                if (
                    targetIndex < 0 ||
                    targetIndex >=
                        chapters.length
                ) {
                    return module;
                }

                [
                    chapters[chapterIndex],
                    chapters[targetIndex],
                ] = [
                    chapters[targetIndex],
                    chapters[chapterIndex],
                ];

                return {
                    ...module,
                    chapters,
                };
            })
        );

        setHasUnsavedChanges(true);
    };

    const moveLesson = (
        moduleId,
        chapterId,
        lessonIndex,
        direction
    ) => {
        setModules((currentModules) =>
            currentModules.map((module) => {
                if (
                    module.id !== moduleId
                ) {
                    return module;
                }

                return {
                    ...module,

                    chapters:
                        module.chapters.map(
                            (chapter) => {
                                if (
                                    chapter.id !==
                                    chapterId
                                ) {
                                    return chapter;
                                }

                                const lessons = [
                                    ...chapter.lessons,
                                ];

                                const targetIndex =
                                    direction ===
                                    'up'
                                        ? lessonIndex -
                                          1
                                        : lessonIndex +
                                          1;

                                if (
                                    targetIndex <
                                        0 ||
                                    targetIndex >=
                                        lessons.length
                                ) {
                                    return chapter;
                                }

                                [
                                    lessons[
                                        lessonIndex
                                    ],
                                    lessons[
                                        targetIndex
                                    ],
                                ] = [
                                    lessons[
                                        targetIndex
                                    ],
                                    lessons[
                                        lessonIndex
                                    ],
                                ];

                                return {
                                    ...chapter,
                                    lessons,
                                };
                            }
                        ),
                };
            })
        );

        setHasUnsavedChanges(true);
    };

    // ============================================================
    // SAVE ALL
    // ============================================================

    const handleSaveAll = async () => {
        try {
            setIsSaving(true);

            await saveCurriculum(
                id,
                modules
            );

            setHasUnsavedChanges(false);

            toast.success(
                'Curriculum saved successfully.'
            );
        } catch (error) {
            console.error(
                'Failed to save curriculum:',
                error
            );

            toast.error(
                error.message ||
                    'Failed to save curriculum.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (isLoading) {
        return (
            <Box>
                <PageHeader
                    title="Curriculum"
                    breadcrumbs={[
                        {
                            label: 'Admin',
                        },
                        {
                            label: 'Courses',
                            to: '/admin/courses',
                        },
                        {
                            label: 'Curriculum',
                        },
                    ]}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent:
                            'center',
                        py: 10,
                    }}
                >
                    <CircularProgress
                        size={32}
                    />
                </Box>
            </Box>
        );
    }

    // ============================================================
    // ERROR
    // ============================================================

    if (error || !course) {
        return (
            <Box>
                <PageHeader
                    title="Curriculum"
                    breadcrumbs={[
                        {
                            label: 'Admin',
                        },
                        {
                            label: 'Courses',
                            to: '/admin/courses',
                        },
                        {
                            label: 'Curriculum',
                        },
                    ]}
                />

                <AdminSurface
                    sx={{
                        py: {
                            xs: 4,
                            sm: 5,
                        },
                        px: {
                            xs: 2.5,
                            sm: 4,
                        },
                        display: 'flex',
                        flexDirection:
                            'column',
                        alignItems:
                            'center',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius:
                                '50%',
                            bgcolor:
                                'rgba(239, 68, 68, 0.08)',
                            color: '#DC2626',
                            display: 'flex',
                            alignItems:
                                'center',
                            justifyContent:
                                'center',
                            mb: 2,
                        }}
                    >
                        <FiAlertTriangle
                            size={22}
                        />
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1E293B',
                            mb: 0.75,
                        }}
                    >
                        Unable to load
                        curriculum
                    </Typography>

                    <Typography
                        sx={{
                            color: '#64748B',
                            mb: 2.5,
                            maxWidth: 520,
                        }}
                    >
                        {error ||
                            'Something went wrong while loading the curriculum.'}
                    </Typography>

                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        spacing={1.5}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: 'fit-content',
                            maxWidth: '100%',
                            mx: 'auto',
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() =>
                                fetchCourse()
                            }
                            sx={{
                                minWidth: 108,
                                borderColor:
                                    '#CBD5E1',
                                color: '#2563EB',
                            }}
                        >
                            Retry
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    '/admin/courses'
                                )
                            }
                            startIcon={
                                <FiArrowLeft
                                    size={16}
                                />
                            }
                            sx={{
                                minWidth: 170,
                                borderColor:
                                    '#CBD5E1',
                                color: '#475569',
                            }}
                        >
                            Back to Courses
                        </Button>
                    </Stack>
                </AdminSurface>
            </Box>
        );
    }

    // ============================================================
    // MAIN UI
    // ============================================================

    return (
        <Box>
            <PageHeader
                title={`${course.name} Curriculum`}
                subtitle="Build and organize your course modules, chapters, and lessons."
                breadcrumbs={[
                    {
                        label: 'Admin',
                    },
                    {
                        label: 'Courses',
                        to: '/admin/courses',
                    },
                    {
                        label: course.name,
                        to: `/admin/courses/${id}`,
                    },
                    {
                        label: 'Curriculum',
                    },
                ]}
                action={
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        spacing={1.5}
                    >
                        {/* Back */}

                        <Button
                            variant="outlined"
                            startIcon={
                                <FiArrowLeft
                                    size={16}
                                />
                            }
                            onClick={() =>
                                navigate(
                                    `/admin/courses/${id}`
                                )
                            }
                            sx={{
                                borderColor:
                                    '#E2E8F0',
                                color: '#64748B',
                                '&:hover': {
                                    borderColor:
                                        '#CBD5E1',
                                    bgcolor:
                                        '#F8FAFC',
                                },
                            }}
                        >
                            Back to Course
                        </Button>

                        {/* Save All */}

                        <Button
                            variant="contained"
                            onClick={
                                handleSaveAll
                            }
                            disabled={
                                isSaving
                            }
                            sx={{
                                bgcolor:
                                    '#16A34A',
                                '&:hover': {
                                    bgcolor:
                                        '#15803D',
                                },
                            }}
                        >
                            {isSaving
                                ? 'Saving...'
                                : 'Save All'}
                        </Button>

                        {/* Add Module */}

                        <Button
                            variant="contained"
                            startIcon={
                                <FiPlus
                                    size={16}
                                />
                            }
                            onClick={
                                openModuleModal
                            }
                            sx={{
                                bgcolor:
                                    '#2563EB',
                                '&:hover': {
                                    bgcolor:
                                        '#1D4ED8',
                                },
                            }}
                        >
                            Add Module
                        </Button>
                    </Stack>
                }
            />

            <AdminSurface
                sx={{
                    p: {
                        xs: 2,
                        md: 4,
                    },
                }}
            >
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1E293B',
                        }}
                    >
                        Course Curriculum
                    </Typography>

                    <Typography
                        sx={{
                            color: '#64748B',
                            mb: 2,
                        }}
                    >
                        Add modules, chapters,
                        and lessons to
                        structure this
                        course.
                    </Typography>

                    {/* =====================================================
                        EMPTY STATE
                    ====================================================== */}

                    {modules.length === 0 ? (
                        <Box
                            sx={{
                                border:
                                    '1px dashed #CBD5E1',
                                borderRadius: 2,
                                p: {
                                    xs: 4,
                                    md: 6,
                                },
                                textAlign:
                                    'center',
                                bgcolor:
                                    '#F8FAFC',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color:
                                        '#475569',
                                    mb: 1,
                                }}
                            >
                                No modules yet
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        '#94A3B8',
                                    fontSize:
                                        '0.9rem',
                                    mb: 3,
                                }}
                            >
                                Start building
                                your course
                                curriculum
                                by adding
                                the first
                                module.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={
                                    <FiPlus
                                        size={16}
                                    />
                                }
                                onClick={
                                    openModuleModal
                                }
                                sx={{
                                    bgcolor:
                                        '#2563EB',
                                    '&:hover':
                                        {
                                            bgcolor:
                                                '#1D4ED8',
                                        },
                                }}
                            >
                                Add First Module
                            </Button>
                        </Box>
                    ) : (
                        <CurriculumTree
                            modules={modules}
                            moveModule={
                                moveModule
                            }
                            moveChapter={
                                moveChapter
                            }
                            moveLesson={
                                moveLesson
                            }
                            openChapterModal={
                                openChapterModal
                            }
                            openEditModuleModal={
                                openEditModuleModal
                            }
                            openDeleteModuleDialog={
                                openDeleteModuleDialog
                            }
                            openLessonModal={
                                openLessonModal
                            }
                            openEditChapterModal={
                                openEditChapterModal
                            }
                            openDeleteChapterDialog={
                                openDeleteChapterDialog
                            }
                            openEditLessonModal={
                                openEditLessonModal
                            }
                            openDeleteLessonDialog={
                                openDeleteLessonDialog
                            }
                        />
                    )}
                </Stack>
            </AdminSurface>

            {/* ============================================================
                MODULE DIALOG
            ============================================================= */}

            <Dialog
                open={isModuleModalOpen}
                onClose={
                    closeModuleModal
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {editingModuleId
                        ? 'Edit Module'
                        : 'Add Module'}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Module title"
                        placeholder="e.g. Introduction"
                        value={
                            moduleTitle
                        }
                        onChange={(
                            event
                        ) => {
                            setModuleTitle(
                                event.target
                                    .value
                            );

                            if (
                                moduleError
                            ) {
                                setModuleError(
                                    ''
                                );
                            }
                        }}
                        error={Boolean(
                            moduleError
                        )}
                        helperText={
                            moduleError ||
                            'Module title is required.'
                        }
                        sx={{
                            mt: 1,
                        }}
                    />
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >
                    <Button
                        onClick={
                            closeModuleModal
                        }
                        sx={{
                            color: '#64748B',
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleSaveModule
                        }
                        sx={{
                            bgcolor:
                                '#2563EB',
                            '&:hover': {
                                bgcolor:
                                    '#1D4ED8',
                            },
                        }}
                    >
                        {editingModuleId
                            ? 'Save Changes'
                            : 'Add Module'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ============================================================
                CHAPTER DIALOG
            ============================================================= */}

            <Dialog
                open={
                    isChapterModalOpen
                }
                onClose={
                    closeChapterModal
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {editingChapterId
                        ? 'Edit Chapter'
                        : 'Add Chapter'}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Chapter title"
                        placeholder="e.g. Getting Started"
                        value={
                            chapterTitle
                        }
                        onChange={(
                            event
                        ) => {
                            setChapterTitle(
                                event.target
                                    .value
                            );

                            if (
                                chapterError
                            ) {
                                setChapterError(
                                    ''
                                );
                            }
                        }}
                        error={Boolean(
                            chapterError
                        )}
                        helperText={
                            chapterError ||
                            'Chapter title is required.'
                        }
                        sx={{
                            mt: 1,
                        }}
                    />
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >
                    <Button
                        onClick={
                            closeChapterModal
                        }
                        sx={{
                            color: '#64748B',
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleSaveChapter
                        }
                        sx={{
                            bgcolor:
                                '#2563EB',
                            '&:hover': {
                                bgcolor:
                                    '#1D4ED8',
                            },
                        }}
                    >
                        {editingChapterId
                            ? 'Save Changes'
                            : 'Add Chapter'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ============================================================
                LESSON DIALOG
            ============================================================= */}

            <Dialog
                open={
                    isLessonModalOpen
                }
                onClose={
                    closeLessonModal
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {editingLessonId
                        ? 'Edit Lesson'
                        : 'Add Lesson'}
                </DialogTitle>

                <DialogContent>
                    <Stack
                        spacing={2.5}
                        sx={{
                            mt: 1,
                        }}
                    >
                        <TextField
                            autoFocus
                            fullWidth
                            label="Lesson title"
                            placeholder="e.g. What is Python?"
                            value={
                                lessonTitle
                            }
                            onChange={(
                                event
                            ) => {
                                setLessonTitle(
                                    event.target
                                        .value
                                );

                                if (
                                    lessonError
                                ) {
                                    setLessonError(
                                        ''
                                    );
                                }
                            }}
                            error={Boolean(
                                lessonError
                            )}
                            helperText={
                                lessonError ||
                                'Lesson title is required.'
                            }
                        />

                        <TextField
                            fullWidth
                            label="Duration"
                            placeholder="e.g. 15 min"
                            value={
                                lessonDuration
                            }
                            onChange={(
                                event
                            ) =>
                                setLessonDuration(
                                    event.target
                                        .value
                                )
                            }
                            helperText="Optional"
                        />

                        <FormControl
                            fullWidth
                        >
                            <InputLabel id="lesson-type-label">
                                Type
                            </InputLabel>

                            <Select
                                labelId="lesson-type-label"
                                value={
                                    lessonType
                                }
                                label="Type"
                                onChange={(
                                    event
                                ) =>
                                    setLessonType(
                                        event
                                            .target
                                            .value
                                    )
                                }
                            >
                                <MenuItem value="lesson">
                                    Lesson
                                </MenuItem>

                                <MenuItem value="video">
                                    Video
                                </MenuItem>

                                <MenuItem value="text">
                                    Text
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >
                    <Button
                        onClick={
                            closeLessonModal
                        }
                        sx={{
                            color: '#64748B',
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleSaveLesson
                        }
                        sx={{
                            bgcolor:
                                '#2563EB',
                            '&:hover': {
                                bgcolor:
                                    '#1D4ED8',
                            },
                        }}
                    >
                        {editingLessonId
                            ? 'Save Changes'
                            : 'Add Lesson'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ============================================================
                DELETE CONFIRMATION
            ============================================================= */}

            <Dialog
                open={
                    deleteDialogOpen
                }
                onClose={
                    closeDeleteDialog
                }
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: '#1E293B',
                    }}
                >
                    Delete{' '}
                    {deleteTarget?.type ===
                    'module'
                        ? 'Module'
                        : deleteTarget?.type ===
                          'chapter'
                        ? 'Chapter'
                        : 'Lesson'}
                    ?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText
                        sx={{
                            color: '#64748B',
                        }}
                    >
                        Are you sure you
                        want to delete{' '}
                        <strong>
                            "
                            {
                                deleteTarget?.title
                            }
                            "
                        </strong>
                        ?
                    </DialogContentText>

                    {deleteTarget?.hasChildren && (
                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                borderRadius:
                                    1.5,
                                bgcolor:
                                    '#FEF2F2',
                                border:
                                    '1px solid #FECACA',
                            }}
                        >
                            <Typography
                                sx={{
                                    color:
                                        '#B91C1C',
                                    fontSize:
                                        '0.875rem',
                                    fontWeight: 500,
                                }}
                            >
                                This item
                                contains
                                child items.
                                Deleting it
                                will also
                                remove all
                                of its
                                contents.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >
                    <Button
                        onClick={
                            closeDeleteDialog
                        }
                        sx={{
                            color: '#64748B',
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={
                            <FiTrash2
                                size={16}
                            />
                        }
                        onClick={
                            handleConfirmDelete
                        }
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Curriculum;