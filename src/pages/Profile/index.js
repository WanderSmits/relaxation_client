import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { postProfile } from "../../store/profile/actions";
import { getHeatmapData } from "../../store/heatmap/actions";
import { selectHeatmapData } from "../../store/heatmap/selector";
import { selectToken } from "../../store/user/selectors";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./profile.css";

export default function Profile() {
  const [interval, setInterval] = useState(3);
  const [notification, setNotification] = useState("");
  const [totalTime, setTotalTime] = useState(5);

  const heatmapData = useSelector(selectHeatmapData);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
    dispatch(getHeatmapData());
  }, [token, history]);

  function submitPreferences(event) {
    event.preventDefault();
    const dateNow = Date(Date.now);
    const dateSubmit = dateNow.toString();

    dispatch(postProfile(interval, notification, totalTime, dateSubmit));
    history.push("/breathing/");
    setInterval(3);
    setNotification("");
    setTotalTime(5);
  }

  const progressMade =
    heatmapData &&
    heatmapData.map((progress) => {
      return { date: progress.session.date };
    });

  return (
    <div>
      <Form as={Col} md={{ span: 6, offset: 2 }} className="mt-5">
        <h1 className="mt-5 mb-5">Exercise preferences</h1>
        <Form.Group>
          <Form.Label>
            <h4>Breathe interval: </h4>
          </Form.Label>
          <Form.Check
            type="radio"
            value={interval}
            label="3 seconds"
            onChange={() => setInterval(3)}
            name="interval"
            id="radio1"
            defaultChecked
          />
          <Form.Check
            type="radio"
            value={interval}
            onChange={() => setInterval(4)}
            label="4 seconds"
            name="interval"
            id="radio2"
          />
          <Form.Check
            type="radio"
            value={interval}
            onChange={() => setInterval(5)}
            label="5 seconds"
            name="interval"
            id="radio2"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <h4>Notify me every day at: </h4>
          </Form.Label>
          <Form.Control
            value={notification}
            onChange={(event) => setNotification(event.target.value)}
            type="time"
            placeholder="Notify me"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <h4>Total time session: </h4>
          </Form.Label>

          <Form.Control
            value={totalTime}
            min="1"
            max="10"
            step="1"
            onChange={(event) => setTotalTime(event.target.value)}
            type="range"
          />
          <Form.Label>
            <p>{`${totalTime} minutes`} </p>
          </Form.Label>
        </Form.Group>

        <h4>Progress: </h4>
        <div style={{ width: 250 }}>
          {heatmapData.length ? (
            <CalendarHeatmap
              startDate={new Date("2019-12-28")}
              endDate={new Date("2020-05-01")}
              values={progressMade}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          ) : null}
        </div>

        <Form.Group className="mt-5">
          <Form>
            <Button
              style={{ display: "inline" }}
              className="btn btn-primary"
              variant="light"
              type="submit"
              onClick={submitPreferences}
            >
              Save changes and start breathing
            </Button>
          </Form>
        </Form.Group>
      </Form>
    </div>
  );
}
