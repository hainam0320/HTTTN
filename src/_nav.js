import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilDrop,
  cilHistory,
  cilPencil,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const getLoggedInUserId = () => {
  return localStorage.getItem('loggedInUserId');
};
const userId = getLoggedInUserId();

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  userId === '1' && {
    component: CNavItem,
    name: 'User list',
    to: '/management/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage test',
    to: '/test',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History test',
    to: '/user-history',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Report',
  },
  userId === '1'&& {
    component: CNavGroup,
    name: 'Statistic',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Statistic',
        to: '/statistic',
      },
    ],
  },
].filter(Boolean); // Loại bỏ các giá trị "false" khỏi mảng

export default _nav;