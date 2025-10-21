import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconDevicesCheck,
  IconUserBolt,
} from "@tabler/icons-react";
import type { Link } from "../types";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { FeaturedProjectManager } from "../components/featured-project-manager";
import { AboutUserManager } from "../components/about-user-manager";
import { useAuth } from "../context/auth-context";
import { TestimonialsManager } from "../components/testimonials-manager";


export function AdminPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const links: Link[] = [
    {
      label: "featured projects",
      content: <FeaturedProjectManager />,
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "about me",
      content: <AboutUserManager />,
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "testimonial",
      content: <TestimonialsManager />,
      icon: <IconDevicesCheck className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Perform logout logic here
    logout()
    setShowLogoutModal(false);
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  return (
    <>
      <div className="mx-auto flex w-full h-screen max-w-7xl flex-1 flex-col overflow-hidden rounded-md border md:flex-row border-neutral-700 bg-gray-900">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveTab(idx);
                      setOpen(false);
                    }}
                    className={`cursor-pointer ${activeTab === idx ? 'opacity-100' : 'opacity-70'}`}
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
                <div onClick={handleLogout} className="cursor-pointer">
                  <SidebarLink
                    link={{
                      label: "Logout",
                      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />,
                      content: <></>, // Add empty content to satisfy type
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: user?.email || 'EMAIL ADDRESS',
                  icon: (
                    <img
                      src={user?.photoURL || ''}
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-t-2xl rounded-b-2xl border p-4 md:p-10 border-gray-950/55 bg-gray-950/55 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {links[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}

const Logo: React.FC = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium uppercase whitespace-pre text-black dark:text-white"
      >
        herotechx portfolio
      </motion.span>
    </div>
  );
};

const LogoIcon: React.FC = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </div>
  );
};


const LogoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <IconArrowLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Are you sure you want to log out? You will need to sign in again to access the admin panel.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

