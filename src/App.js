import React from 'react';
import GlobalStyle from './global-styles';
import styled from 'styled-components';
import Header from './components/Header';
import StationList from "./containers/StationList";
import Station from './containers/Station';
import ArrivalsList from "./containers/ArrivalsList";
import StaticSchedule from './containers/StaticSchedule';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ContentWell = styled.div`
  padding: 71px 0 0;
`;

function App() {
  return (
      <Router>
          <div className="">
              <GlobalStyle/>
              <Header />
              <ContentWell>
                  <Switch>
                      <Route
                          path="/static/:station/:direction"
                          component={StaticSchedule} />
                      <Route
                          path="/static/:station"
                          component={StaticSchedule} />
                      <Route
                          path="/:station/:direction"
                          component={ArrivalsList} />
                      <Route
                          path="/:station"
                          component={Station} />
                      <Route
                          path="/"
                          component={StationList} />

                  </Switch>
              </ContentWell>
        </div>
      </Router>
  );
}

export default App;
