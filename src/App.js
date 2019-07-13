import React, {useState} from 'react';
import GlobalStyle from './global-styles';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import StationList from "./containers/StationList";
import DirectionDoor from './containers/DirectionDoor';
import StaticSchedule from './containers/StaticSchedule';
import ArrivalList from "./containers/ArrivalsList";

const ContentWell = styled.div`
  padding: 71px 0 0;
`;

function App() {

    const [fixedHeader, setFixedHeader] = useState(true);
    return (
      <Router>
          <div>
              <GlobalStyle/>
              <Header fixed={fixedHeader}/>
              <ContentWell>
                  <Switch>
                      <Route
                          path="/static/:station/:direction"
                          render={(props) => {
                              setFixedHeader(false);
                              return <StaticSchedule {...props}/>
                          }}
                      />
                      <Route
                          path="/static/:station"
                          component={DirectionDoor}
                      />
                      <Route
                          path="/:station/:direction"
                          render={(props) => {
                              setFixedHeader(false);
                              return <ArrivalList {...props}/>
                          }}
                      />
                      <Route
                          path="/:station"
                          component={DirectionDoor} />
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
