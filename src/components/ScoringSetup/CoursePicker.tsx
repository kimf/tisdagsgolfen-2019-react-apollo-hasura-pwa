import React from "react";
import { Query } from "react-apollo";

import coursesQuery from "../../graphql/queries/coursesQuery";

interface Course {
  id: string;
  club: string;
  name: string;
}

const CoursePicker = React.memo(
  ({
    courseId,
    setCourse
  }: {
    courseId: string;
    setCourse: (id: string) => void;
  }) => {
    return (
      <Query query={coursesQuery}>
        {({ data, error, loading }) => {
          if (loading) { return null; }
          if (error) { return <div>`Error! ${error.message}`</div>; }

          if (data.courses.length === 0) {
            return null;
          }

          return (
            <ul>
              {data.courses.map((course: Course) => {
                const isSelected = courseId === course.id;
                return (
                  <li
                    key={course.id}
                    onClick={() => setCourse(course.id)}
                    className={isSelected ? "selected" : ""}
                  >
                    {course.club} - {course.name}
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Query>
    );
  }
);

export default CoursePicker;
