import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import NumberDone from 'src/components/NumberDone';
// import { useUserStore } from 'src/states/auth-store';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  lesson,
  expanded,
  index,
  userLessonData,
  // selected,
  // onSelected,
  onExpanded,
  hasBoughtCourse,
  unitId,
}) {
  // const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';
  lesson.unLocked = true;

  // const { UserData } = useUserStore();

  // const [progress, setProgress] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (!hasBoughtCourse) {
      toast.error('Please buy the course to view the content', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      onExpanded();
    }
  };

  const hasMatch = Boolean(userLessonData.find((a) => a.LessonTitle === lesson.id));

  return (
    <Accordion
      expanded={hasBoughtCourse && expanded}
      onChange={handleChange}
      disabled={!lesson.unLocked}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
      }}
    >
      <AccordionSummary
        sx={{
          pr: 1,
          pl: 1,
          minHeight: 64,
          [`& .${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
          [`&.${accordionSummaryClasses.expanded}`]: {
            bgcolor: 'action.selected',
          },
        }}
      >
        {lesson.unLocked ? (
          // <NumberDone index={index} lessonComplete={lessonComplete} />
          <Typography sx={{ mr: 1 }}>
            <NumberDone
              index={index}
              lessonComplete={hasMatch}
              sx={{ ml: 2 }}
              // lessonComplete={metaData?.filter((l) => l.LessonTitle === lesson?.title)}
            />
          </Typography>
        ) : (
          <img src="/icons/lock.svg" alt="lesson" />
        )}
        {hasBoughtCourse ? (
          <Link
            component={RouterLink}
            href={`lessons/?unit=${unitId}&lesson=${lesson.title}`}
            color="inherit"
            sx={{
              pl: 1,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                flexGrow: 1,
              }}
              // onClick={() => getUserProgress()}
            >
              {lesson.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            variant="subtitle1"
            sx={{
              pl: 2,
              flexGrow: 1,
            }}
          >
            {lesson.title}
          </Typography>
        )}
        {/* <Typography variant="body2">{lesson.time} minutes</Typography> */}
        {/* <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} sx={{ ml: 2 }} /> */}
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
      >
        {lesson.subtitle}
      </AccordionDetails>
    </Accordion>
  );
}

ElearningCourseDetailsLessonItem.propTypes = {
  expanded: PropTypes.bool,
  lesson: PropTypes.object,
  index: PropTypes.any,
  onExpanded: PropTypes.func,
  userLessonData: PropTypes.any,
  // onSelected: PropTypes.func,
  // selected: PropTypes.bool,
  hasBoughtCourse: PropTypes.bool,
  unitId: PropTypes.string,
};
