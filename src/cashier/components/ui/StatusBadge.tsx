import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Badge } from './Badge';

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status.toLowerCase()) {
    case 'approved':
    case 'completed':
    case 'active':
      return <Badge variant="success" className="flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> {status}</Badge>;
    case 'pending':
      return <Badge variant="warning" className="flex items-center gap-1 w-fit"><Clock size={10} /> {status}</Badge>;
    case 'rejected':
    case 'failed':
    case 'inactive':
      return <Badge variant="error" className="flex items-center gap-1 w-fit"><XCircle size={10} /> {status}</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
