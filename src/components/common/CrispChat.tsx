import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

declare global {
    interface Window {
        $crisp: any[];
    }
}

export const CrispChat = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (user && window.$crisp) {
            // Set user email and nickname in Crisp
            window.$crisp.push(["set", "user:email", [user.email]]);
            window.$crisp.push(["set", "user:nickname", [user.name]]);

            if (user.phone) {
                window.$crisp.push(["set", "user:phone", [user.phone]]);
            }

            // Optionally add more user data
            if (user.role) {
                window.$crisp.push(["set", "session:data", [[["role", user.role]]]]);
            }
        } else if (!user && window.$crisp) {
            // Reset session when user logs out to clear chat history for next user
            // This is important for privacy on shared devices
            // window.$crisp.push(["do", "session:reset"]);
        }
    }, [user]);

    return null; // This component doesn't render anything
};
