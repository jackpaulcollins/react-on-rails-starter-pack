import { React, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { TOKEN, REFRESH_TOKEN, clearToken } from '../../api/Api';
import { useAuthContext } from '../../contexts/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const location = useLocation();

  const handleSignOut = () => {
    [TOKEN, REFRESH_TOKEN].forEach((t) => clearToken(t));
    dispatch({ type: 'CLEAR_USER' });
    navigate('/login');
  };

  const activeLink = (route) => {
    const active = ' border-indigo-500 text-gray-900';
    const inactive = ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
    let styles = 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium';

    if (route === location.pathname) {
      styles += active;
    } else {
      styles += inactive;
    }

    return styles;
  };

  const activeMobileLink = (route) => {
    const inactive = ' border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700';
    const active = ' border-indigo-500 bg-indigo-50 text-indigo-700';

    let styles = 'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6';
    if (route === location.pathname) {
      styles += active;
    } else {
      styles += inactive;
    }

    return styles;
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link to="/" className={activeLink('/')}>
                    Dashboard
                  </Link>
                  <Link to="/jobs" className={activeLink('/jobs')}>
                    Jobs
                  </Link>
                  <Link to="/team" className={activeLink('/team')}>
                    Team
                  </Link>
                  <Link to="/templates" className={activeLink('/templates')}>
                    Templates
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    New Job
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleSignOut}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                              role="menuitem"
                              tabIndex={0}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button as="span" className={activeMobileLink('/')}>
                  Dashboard
                </Disclosure.Button>
              </Link>

              <Link to="/jobs">
                <Disclosure.Button
                  as="span"
                  className={activeMobileLink('/jobs')}
                >
                  Jobs
                </Disclosure.Button>
              </Link>

              <Link to="/team">
                <Disclosure.Button
                  as="span"
                  className={activeMobileLink('/team')}
                >
                  Team
                </Disclosure.Button>
              </Link>

              <Link to="/templates">
                <Disclosure.Button
                  as="span"
                  className={activeMobileLink('/templates')}
                >
                  Templates
                </Disclosure.Button>
              </Link>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile">
                  <Disclosure.Button
                    as="span"
                    className={activeMobileLink('/profile')}
                  >
                    Your Profile
                  </Disclosure.Button>
                </Link>

                <Link to="/settings">
                  <Disclosure.Button
                    as="span"
                    className={activeMobileLink('/settings')}
                  >
                    Settings
                  </Disclosure.Button>
                </Link>

                <Disclosure.Button
                  as="span"
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6 hover:cursor-pointer"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;