import * as React from 'react';
// import { NavLink } from 'react-router-dom';
// import taskService, { Task } from './task-service';
import { createHashHistory } from 'history';
import { Button, Stack, Typography } from '@mui/material';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders app
 */
export class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
          <Typography variant="h2">Hello mister Nielsen</Typography>
        </div>
      </>
    );
  }

  mounted() {
    console.log('test');
  }
}
