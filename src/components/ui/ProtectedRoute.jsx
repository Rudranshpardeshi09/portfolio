import { Navigate } from 'react';
import useThemeStore from '../../store/themeStore';

export default function ProtectedRoute({ children }) {
    const { bikeSelected } = useThemeStore();

    if (!bikeSelected) {
        // Redirect to bike selection if no bike is selected
        return <Navigate to="/" replace />;
    }

    return children;
}
