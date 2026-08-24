import { useEffect, useState } from 'react';
import styles from './copyText.module.css';
import { GoCheck, GoCopy } from "react-icons/go";

interface CopyTextProps {
    textToCopy?: string;
    backgroundColor?: string;
    primaryColor?: string;
}

export const CopyText: React.FC<CopyTextProps> = ({ textToCopy = "npm install retroByteUI@latest", backgroundColor= "#434347", primaryColor= "#EFEFEF"}) => {
    const customStyles = {
        '--primary-color': primaryColor,
        '--secondary-color': backgroundColor,
    } as React.CSSProperties;
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (copyStatus === 'idle') {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setCopyStatus('idle');
        }, 2000);

        return () => window.clearTimeout(timeoutId);
    }, [copyStatus]);

    const handleCopyClick = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopyStatus('success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopyStatus('error');
        }
    };

    const feedbackText = copyStatus === 'success' ? 'Copiado' : copyStatus === 'error' ? 'Error' : '';

    return (
        <div className={styles.container} style={customStyles}>
            <p className={styles.text}>{textToCopy}</p>
            <button
                className={`${styles.button} ${copyStatus !== 'idle' ? styles.feedback : ''}`}
                onClick={handleCopyClick}
                aria-label={copyStatus === 'success' ? 'Texto copiado' : 'Copiar texto'}
                title={copyStatus === 'success' ? 'Texto copiado' : 'Copiar texto'}
            >
                {copyStatus === 'success' ? <GoCheck /> : <GoCopy />}
                {feedbackText && <span>{feedbackText}</span>}
            </button>
        </div>
    );
};


