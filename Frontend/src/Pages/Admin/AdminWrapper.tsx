import React from 'react';
import Admin from './Admin';
import { DUserTokenInterface } from '../../models/TokenMoodel';

interface AdminWrapperProps {
  userToken: DUserTokenInterface;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({ userToken }) => {
  return <Admin userToken={userToken} />;
};

export default AdminWrapper;
