import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import {
    FiChevronDown,
    FiChevronUp,
    FiEdit2,
    FiPlus,
    FiTrash2,
} from 'react-icons/fi';

const CurriculumTree = ({
    modules,
    moveModule,
    moveChapter,
    moveLesson,
    openChapterModal,
    openEditModuleModal,
    openDeleteModuleDialog,
    openLessonModal,
    openEditChapterModal,
    openDeleteChapterDialog,
    openEditLessonModal,
    openDeleteLessonDialog,
}) => {
    return (
        <Stack spacing={2} sx={{ mt: 1 }}>
            {modules.map((module, moduleIndex) => (
                <Box
                    key={module.id}
                    sx={{
                        border: '1px solid #E2E8F0',
                        borderRadius: 2,
                        bgcolor: '#FFFFFF',
                        overflow: 'hidden',
                    }}
                >
                    {/* =====================================================
                        MODULE HEADER
                    ====================================================== */}

                    <Box
                        sx={{
                            p: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    mb: 0.5,
                                }}
                            >
                                Module {moduleIndex + 1}
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: '#1E293B',
                                }}
                            >
                                {module.title}
                            </Typography>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                        >
                            {/* Add Chapter */}

                            <Button
                                size="small"
                                startIcon={<FiPlus size={15} />}
                                onClick={() =>
                                    openChapterModal(module.id)
                                }
                            >
                                Add Chapter
                            </Button>

                            {/* Move Module Up */}

                            <IconButton
                                size="small"
                                disabled={moduleIndex === 0}
                                onClick={() =>
                                    moveModule(
                                        moduleIndex,
                                        'up'
                                    )
                                }
                                title="Move module up"
                                sx={{
                                    color: '#64748B',
                                }}
                            >
                                <FiChevronUp size={17} />
                            </IconButton>

                            {/* Move Module Down */}

                            <IconButton
                                size="small"
                                disabled={
                                    moduleIndex ===
                                    modules.length - 1
                                }
                                onClick={() =>
                                    moveModule(
                                        moduleIndex,
                                        'down'
                                    )
                                }
                                title="Move module down"
                                sx={{
                                    color: '#64748B',
                                }}
                            >
                                <FiChevronDown size={17} />
                            </IconButton>

                            {/* Edit Module */}

                            <IconButton
                                size="small"
                                onClick={() =>
                                    openEditModuleModal(module)
                                }
                                title="Edit module"
                                sx={{
                                    color: '#64748B',
                                }}
                            >
                                <FiEdit2 size={16} />
                            </IconButton>

                            {/* Delete Module */}

                            <IconButton
                                size="small"
                                onClick={() =>
                                    openDeleteModuleDialog(module)
                                }
                                title="Delete module"
                                sx={{
                                    color: '#EF4444',
                                }}
                            >
                                <FiTrash2 size={16} />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* =====================================================
                        CHAPTERS
                    ====================================================== */}

                    {module.chapters?.length > 0 && (
                        <Box
                            sx={{
                                px: {
                                    xs: 1.5,
                                    md: 2.5,
                                },
                                pb: 2.5,
                            }}
                        >
                            <Stack spacing={1.5}>
                                {module.chapters.map(
                                    (
                                        chapter,
                                        chapterIndex
                                    ) => (
                                        <Box
                                            key={chapter.id}
                                            sx={{
                                                border:
                                                    '1px solid #F1F5F9',
                                                borderRadius: 1.5,
                                                bgcolor: '#F8FAFC',
                                                overflow:
                                                    'hidden',
                                            }}
                                        >
                                            {/* =================================
                                                CHAPTER HEADER
                                            ================================== */}

                                            <Box
                                                sx={{
                                                    px: 2,
                                                    py: 1.75,
                                                    display: 'flex',
                                                    alignItems:
                                                        'center',
                                                    justifyContent:
                                                        'space-between',
                                                    gap: 2,
                                                    flexWrap:
                                                        'wrap',
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                '0.7rem',
                                                            fontWeight:
                                                                700,
                                                            color:
                                                                '#94A3B8',
                                                            textTransform:
                                                                'uppercase',
                                                            mb: 0.25,
                                                        }}
                                                    >
                                                        Chapter{' '}
                                                        {chapterIndex +
                                                            1}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight:
                                                                600,
                                                            color:
                                                                '#334155',
                                                        }}
                                                    >
                                                        {
                                                            chapter.title
                                                        }
                                                    </Typography>
                                                </Box>

                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    {/* Add Lesson */}

                                                    <Button
                                                        size="small"
                                                        startIcon={
                                                            <FiPlus
                                                                size={
                                                                    14
                                                                }
                                                            />
                                                        }
                                                        onClick={() =>
                                                            openLessonModal(
                                                                module.id,
                                                                chapter.id
                                                            )
                                                        }
                                                    >
                                                        Add Lesson
                                                    </Button>

                                                    {/* Move Chapter Up */}

                                                    <IconButton
                                                        size="small"
                                                        disabled={
                                                            chapterIndex ===
                                                            0
                                                        }
                                                        onClick={() =>
                                                            moveChapter(
                                                                module.id,
                                                                chapterIndex,
                                                                'up'
                                                            )
                                                        }
                                                        title="Move chapter up"
                                                        sx={{
                                                            color:
                                                                '#64748B',
                                                        }}
                                                    >
                                                        <FiChevronUp
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </IconButton>

                                                    {/* Move Chapter Down */}

                                                    <IconButton
                                                        size="small"
                                                        disabled={
                                                            chapterIndex ===
                                                            module
                                                                .chapters
                                                                .length -
                                                                1
                                                        }
                                                        onClick={() =>
                                                            moveChapter(
                                                                module.id,
                                                                chapterIndex,
                                                                'down'
                                                            )
                                                        }
                                                        title="Move chapter down"
                                                        sx={{
                                                            color:
                                                                '#64748B',
                                                        }}
                                                    >
                                                        <FiChevronDown
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </IconButton>

                                                    {/* Edit Chapter */}

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            openEditChapterModal(
                                                                module.id,
                                                                chapter
                                                            )
                                                        }
                                                        title="Edit chapter"
                                                        sx={{
                                                            color:
                                                                '#64748B',
                                                        }}
                                                    >
                                                        <FiEdit2
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </IconButton>

                                                    {/* Delete Chapter */}

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            openDeleteChapterDialog(
                                                                module.id,
                                                                chapter
                                                            )
                                                        }
                                                        title="Delete chapter"
                                                        sx={{
                                                            color:
                                                                '#EF4444',
                                                        }}
                                                    >
                                                        <FiTrash2
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </IconButton>
                                                </Stack>
                                            </Box>

                                            {/* =================================
                                                LESSONS
                                            ================================== */}

                                            {chapter.lessons
                                                ?.length >
                                                0 && (
                                                <Box
                                                    sx={{
                                                        px: 2,
                                                        pb: 2,
                                                    }}
                                                >
                                                    <Stack
                                                        spacing={
                                                            1
                                                        }
                                                    >
                                                        {chapter.lessons.map(
                                                            (
                                                                lesson,
                                                                lessonIndex
                                                            ) => (
                                                                <Box
                                                                    key={
                                                                        lesson.id
                                                                    }
                                                                    sx={{
                                                                        bgcolor:
                                                                            '#FFFFFF',
                                                                        border:
                                                                            '1px solid #E2E8F0',
                                                                        borderRadius:
                                                                            1.5,
                                                                        px: 2,
                                                                        py: 1.5,
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        gap: 2,
                                                                    }}
                                                                >
                                                                    {/* Lesson information */}

                                                                    <Box
                                                                        sx={{
                                                                            minWidth: 0,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.68rem',
                                                                                fontWeight:
                                                                                    700,
                                                                                color:
                                                                                    '#94A3B8',
                                                                                textTransform:
                                                                                    'uppercase',
                                                                                mb: 0.25,
                                                                            }}
                                                                        >
                                                                            Lesson{' '}
                                                                            {lessonIndex +
                                                                                1}
                                                                        </Typography>

                                                                        <Typography
                                                                            sx={{
                                                                                fontWeight:
                                                                                    600,
                                                                                color:
                                                                                    '#334155',
                                                                                wordBreak:
                                                                                    'break-word',
                                                                            }}
                                                                        >
                                                                            {
                                                                                lesson.title
                                                                            }
                                                                        </Typography>

                                                                        {(lesson.duration ||
                                                                            lesson.type) && (
                                                                            <Typography
                                                                                sx={{
                                                                                    mt: 0.4,
                                                                                    fontSize:
                                                                                        '0.8rem',
                                                                                    color:
                                                                                        '#94A3B8',
                                                                                    textTransform:
                                                                                        'capitalize',
                                                                                }}
                                                                            >
                                                                                {lesson.duration ||
                                                                                    'No duration'}
                                                                                {' • '}
                                                                                {
                                                                                    lesson.type
                                                                                }
                                                                            </Typography>
                                                                        )}
                                                                    </Box>

                                                                    {/* Lesson actions */}

                                                                    <Stack
                                                                        direction="row"
                                                                        spacing={
                                                                            0.5
                                                                        }
                                                                        sx={{
                                                                            flexShrink: 0,
                                                                        }}
                                                                    >
                                                                        {/* Move Lesson Up */}

                                                                        <IconButton
                                                                            size="small"
                                                                            disabled={
                                                                                lessonIndex ===
                                                                                0
                                                                            }
                                                                            onClick={() =>
                                                                                moveLesson(
                                                                                    module.id,
                                                                                    chapter.id,
                                                                                    lessonIndex,
                                                                                    'up'
                                                                                )
                                                                            }
                                                                            title="Move lesson up"
                                                                            sx={{
                                                                                color:
                                                                                    '#64748B',
                                                                            }}
                                                                        >
                                                                            <FiChevronUp
                                                                                size={
                                                                                    15
                                                                                }
                                                                            />
                                                                        </IconButton>

                                                                        {/* Move Lesson Down */}

                                                                        <IconButton
                                                                            size="small"
                                                                            disabled={
                                                                                lessonIndex ===
                                                                                chapter
                                                                                    .lessons
                                                                                    .length -
                                                                                    1
                                                                            }
                                                                            onClick={() =>
                                                                                moveLesson(
                                                                                    module.id,
                                                                                    chapter.id,
                                                                                    lessonIndex,
                                                                                    'down'
                                                                                )
                                                                            }
                                                                            title="Move lesson down"
                                                                            sx={{
                                                                                color:
                                                                                    '#64748B',
                                                                            }}
                                                                        >
                                                                            <FiChevronDown
                                                                                size={
                                                                                    15
                                                                                }
                                                                            />
                                                                        </IconButton>

                                                                        {/* Edit Lesson */}

                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                openEditLessonModal(
                                                                                    module.id,
                                                                                    chapter.id,
                                                                                    lesson
                                                                                )
                                                                            }
                                                                            title="Edit lesson"
                                                                            sx={{
                                                                                color:
                                                                                    '#64748B',
                                                                            }}
                                                                        >
                                                                            <FiEdit2
                                                                                size={
                                                                                    15
                                                                                }
                                                                            />
                                                                        </IconButton>

                                                                        {/* Delete Lesson */}

                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                openDeleteLessonDialog(
                                                                                    module.id,
                                                                                    chapter.id,
                                                                                    lesson
                                                                                )
                                                                            }
                                                                            title="Delete lesson"
                                                                            sx={{
                                                                                color:
                                                                                    '#EF4444',
                                                                            }}
                                                                        >
                                                                            <FiTrash2
                                                                                size={
                                                                                    15
                                                                                }
                                                                            />
                                                                        </IconButton>
                                                                    </Stack>
                                                                </Box>
                                                            )
                                                        )}
                                                    </Stack>
                                                </Box>
                                            )}
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </Box>
                    )}
                </Box>
            ))}
        </Stack>
    );
};

export default CurriculumTree;