import Feedback from './Feedback';
import VendorNavbar from './UserNavbar'

export default function VendorLayout({ children }) {
  return (
    <div>
      <VendorNavbar />
      <main className="p-6">
        {children}
      </main>
      <Feedback />
    </div>
  );
}