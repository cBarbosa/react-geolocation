import React from 'react';
import { BrowserRouter ,Route, Switch } from 'react-router-dom';

import { Noticia01 } from './pages/noticia01';
import { Reporte01 } from './pages/report01';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Noticia01} />
              <Route path="/admin/report" exact={true} component={Reporte01} />
            </Switch>
        </BrowserRouter>
      );
}

export default App;
