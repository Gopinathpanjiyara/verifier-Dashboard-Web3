import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DocumentHeader from './components/DocumentHeader';
import DocumentPreview from './components/DocumentPreview';
import VerificationForm from './components/VerificationForm';
import DocumentMetadata from './components/DocumentMetadata';
import VerificationHistory from './components/VerificationHistory';

// Mock document data
const mockDocumentData = {
  'doc-001': {
    id: 'doc-001',
    name: 'Employment Certificate',
    organization: 'TechCorp Inc.',
    submittedAt: '2025-03-20T10:30:00',
    priority: 'high',
    status: 'new',
    type: 'Employment',
    size: '1.2 MB',
    submittedBy: 'John Smith',
    description: 'Employment verification certificate from TechCorp Inc.',
    fileUrl: '/mock-documents/employment-cert.pdf',
    metadata: {
      issueDate: '2025-01-15',
      expiryDate: '2026-01-15',
      issuer: 'TechCorp HR Department',
      documentId: 'TC-EMP-2025-0042',
      signedBy: 'Maria Johnson, HR Director'
    },
    verificationHistory: [
      { id: 'vh-001', action: 'Document Uploaded', timestamp: '2025-03-20T10:30:00', user: 'John Smith', notes: 'Initial upload' },
      { id: 'vh-002', action: 'Automated Verification', timestamp: '2025-03-20T10:31:00', user: 'System', notes: 'Document format validated' }
    ]
  },
  // Add more mock documents as needed
};

const DocumentVerification = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [verificationChecklist, setVerificationChecklist] = useState({
    documentFormat: false,
    issuerVerified: false,
    contentAuthenticity: false,
    noTampering: false,
    validSignatures: false
  });

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const doc = mockDocumentData[documentId];
        if (doc) {
          setDocument(doc);
        }
        setIsLoading(false);
      }, 1500);
    };

    loadDocument();
  }, [documentId]);

  const handleVerificationSubmit = (action) => {
    // In a real app, this would make an API call
    console.log(`Document ${documentId} ${action} with notes: ${verificationNotes}`);
    
    // Update verification status
    setVerificationStatus(action === 'approve' ? 'approved' : 'rejected');
    
    // Add to verification history
    const newHistory = {
      id: `vh-${Date.now()}`,
      action: action === 'approve' ? 'Document Approved' : 'Document Rejected',
      timestamp: new Date().toISOString(),
      user: 'Current Verifier',
      notes: verificationNotes
    };
    
    setDocument(prev => ({
      ...prev,
      status: action === 'approve' ? 'approved' : 'rejected',
      verificationHistory: [...prev.verificationHistory, newHistory]
    }));
    
    // Navigate back to queue after a delay
    setTimeout(() => {
      navigate('/document-queue');
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-primary rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
              borderRadius: ["50%", "40%", "50%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
        <motion.p
          className="mt-4 text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading document...
        </motion.p>
      </div>
    );
  }

  // Document not found
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Document Not Found</h2>
        <p className="text-gray-400 mb-6">The document you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/document-queue')}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          Return to Document Queue
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <DocumentHeader 
        document={document} 
        navigate={navigate} 
        variants={itemVariants} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <DocumentPreview document={document} />
          
          <VerificationForm 
            verificationStatus={verificationStatus}
            verificationNotes={verificationNotes}
            setVerificationNotes={setVerificationNotes}
            verificationChecklist={verificationChecklist}
            setVerificationChecklist={setVerificationChecklist}
            handleVerificationSubmit={handleVerificationSubmit}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <DocumentMetadata document={document} />
          <VerificationHistory history={document.verificationHistory} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DocumentVerification;
