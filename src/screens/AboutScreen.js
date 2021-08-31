import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import mernImage from '../assets/images/mernStackImage.png';

const AboutScreen = () => {
  return (
    <Container className='aboutContainer aboutScrollable'>
      <center>
        <img src={mernImage} alt='Mern Stack ' width='300'></img>
        <br />
        <strong>QuickTicket</strong> is a portfolio project designed and created
        by me, Janty Youssef, using the MERN stack.
      </center>
      <br />

      <Tabs defaultActiveKey='instructions' className='mb-3'>
        <Tab eventKey='instructions' title='Instructions'>
          <br />
          <h4>Instructions for using QuickTicket:</h4>
          <br />
          <ul>
            <li>
              Once logged in you can see your name, tickets assigned to you, and
              refresh timer on the Nav Bar.
            </li>
            <li>
              The ticket list on the left side is the ticket queue. Click on
              "Show Closed" to view tickets that have been marked closed or
              resolved.
            </li>
            <li>
              Click on "Load Details" to push the ticket details to the right
              side of the screen. The background color for the buttons
              correspond to the priority.
              <ul>
                <li style={{ color: 'green' }}>Green - Low</li>
                <li style={{ color: 'orange' }}>Orange - Medium</li>
                <li style={{ color: 'red' }}>Red - High</li>
                <li>
                  A tooltip will appear while hovering over the button to
                  further clarfiy.
                </li>
              </ul>
            </li>
            <li>
              A tool tip will also appear over the date and time submitted in
              the ticket queue - hover over to see how long ago the ticket was
              created and how long ago it was last updated.
            </li>
            <li>
              Clicking on a client's name or a tech's name will show a popup
              with contact information.
            </li>
            <li>
              When creating a new ticket, please be aware that the Ticket
              Description <strong>may not be edited</strong> after submission.
              Other fields may be edited at will.
            </li>
            <li>
              If you have no tickets assigned to you ("My Tickets - 0"),
              clicking it will bring you back to the main ticket queue.
            </li>
            <li>
              Tickets that are marked Closed/Resolved will not show in the
              ticket queue by default. Click on "Show Closed" to view those
              tickets.
            </li>

            <br />
            <li>Configuring the Refresh Timer</li>
            <ul>
              <li>
                The app will automatically refresh the ticket queue along with
                the logged in user's "My Tickets".
              </li>
              <li>
                The default timer is set to refresh every 1 minute by default.
              </li>
              <li>You may configure it to 1, 3, 5, and 10 minutes.</li>
              <li>
                The refresh is <strong>disabled </strong> while viewing and
                editing the details of a ticket (including creating and editing
                notes), while creating a new ticket and while the search panel
                is active.
              </li>
              <li>
                While the refresh is not disabled, you may click the{' '}
                <i className='fas fa-sync'></i> icon to refresh the ticket
                queue.
              </li>
            </ul>
          </ul>
          <ul>
            <li>Ticket Details:</li>
            <ul>
              <li>
                When a ticket is loaded, the corresponding ticket will be
                highlighted in the ticket queue
              </li>
              <li>You may edit the ticket details and add a new note.</li>
              <li>
                If you have an existing note, you may edit it or delete it as
                long as you are the user who submitted it.
              </li>
              <li>
                Any notes and edits will be listed in the bottom portion named
                "Ticket History." This includes:
              </li>
              <ul>
                <li>Creating and editing the ticket.</li>
                <li>Creating, editing, and deleting a note.</li>
                <li>Changing the tech assigned</li>
                <li>Marking the ticket Open, Resolved, or Closed.</li>
              </ul>
              <li>
                Click on "Clear Current Ticket" on the top when you are done
                viewing the ticket. This will allow the refresh function to
                resume.
              </li>
            </ul>
          </ul>
        </Tab>
        <Tab eventKey='vision' title='Vision'>
          <p>
            During my time at college, I worked for the university's IT Help
            Desk for a little over 2 years. While I was learning React, I began
            to brainstorm how I could recreate the functionality with my own
            twist. The goal for QuickTicket was to make a single page
            application, having everything contained to only one path.
          </p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AboutScreen;
