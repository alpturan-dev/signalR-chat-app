import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import GroupChat from '../pages/GroupChat';
import GlobalChat from '../pages/GlobalChat';

const Routing = () => {
    return (
        <Routes>
            <Route
                element={
                    <>
                        <Outlet />
                    </>
                }
            >
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/global-chat" element={<GlobalChat />} />
                <Route path="/group-chat" element={<GroupChat />} />
                {/* <Route exact path="/add" element={<AddNewBug />} />
                <Route path="/bugs/:id" element={<BugDetails />} /> */}
            </Route>
        </Routes>
    );
};

export default Routing;