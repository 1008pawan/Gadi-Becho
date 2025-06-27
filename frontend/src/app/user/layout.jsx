import Feedback from './Feedback';
import VendorNavbar from './UserNavbar'
import { Toaster } from 'react-hot-toast'

export default function VendorLayout({ children }) {
  return (
    <div>
      <VendorNavbar />
      <main className="p-6">
        {children}
      </main>
      <Feedback />
      <Toaster position="top-right" />
    </div>
  );
}