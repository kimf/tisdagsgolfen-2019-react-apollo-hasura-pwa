import React from "react";
import { Query } from "react-apollo";
import Slider from "react-slick";

import eventsQuery from "../graphql/queries/eventsQuery";

interface Event {
  id: number;
  course: {
    club: string;
    name: string;
  };
  scoringType: string;
  startsAt: string;
  status: string;
  teamEvent: boolean;
}

const settings = {
  arrows: false,
  dots: false,
  easing: "ease-in-out",
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 350,
  swipeToSlide: true
};

const Events = React.memo((_) => (
  <Query query={eventsQuery}>
    {({ data, error, loading }) => {
      if (loading) {
        return null;
      }
      if (error) {
        return <div>{`Error! ${error.message}`}</div>;
      }
      if (data.events.length === 0) {
        return null;
      }
      return (
        <Slider {...settings}>
          {data.events.map((event: Event) => (
            <div key={event.id} className="slider-item">
              <div className="wrapper">
                <strong>{event.startsAt}</strong>
                <span>
                  {event.course.club} {event.course.name}
                </span>
                <strong>{event.scoringType}</strong>
              </div>
            </div>
          ))}
        </Slider>
      );
    }}
  </Query>
));

export default Events;
