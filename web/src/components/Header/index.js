import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', path: '/home' },
  { name: 'Tutorial', path: '/tutorial' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const location = useLocation()

  const { pathname } = location

  return (
    <Popover className="bg-primary-dark sticky top-0 py-1 lg:py-3 shadow-lg z-50">
      {({ open }) => (
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            <nav className="relative flex items-center justify-between h-16" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to="/home">
                    <span className="text-white font-medium">CoDNaS-Repeats</span>
                  </Link>
                  <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                    <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-3 hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex md:ml-10 md:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={classNames(
                      'text-white font-medium hover:bg-primary-light',
                      `py-2 px-3 rounded-md nav-link ${pathname === item.path ? 'bg-primary-light' : ''}`
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-white ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/home">
                      <span className="text-black font-medium">CoDNaS-Repeats</span>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="nline-flex items-center justify-center p-2 rounded-md text-gray-3 hover:text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1 ">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        'text-black hover:bg-primary-dark',
                        `block px-3 py-2 rounded-md text-sm nav-link ${pathname === item.path ? 'bg-primary-dark' : ''}`
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  )
}

export default Header
