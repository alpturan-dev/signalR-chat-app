import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import GroupChat from '../pages/GroupChat';
import GlobalChat from '../pages/GlobalChat';
import DirectChat from '../pages/DirectChat';

const Routing = () => {
    return (
        <Routes>
            <Route
                element={
                    <div>
                        <Outlet />
                    </div>
                }
            >
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/global-chat" element={<GlobalChat />} />
                <Route path="/group-chat" element={<GroupChat />} />
                <Route path="/direct-chat" element={<DirectChat />} />
            </Route>
        </Routes>
    );
};

export default Routing;