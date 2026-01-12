import { useState, useEffect } from 'react';

export type ABVariant = 'A' | 'B';

interface ABTestConfig {
    testId: string;
    activeVariants: ABVariant[]; // Which variants are active (e.g., ['A', 'B'] or ['A'] for winner)
}

// Active A/B Tests Configuration
// To declare a winner: set activeVariants to ['A'] or ['B']
export const AB_TESTS: Record<string, ABTestConfig> = {
    hero_headline: {
        testId: 'hero_headline_v1',
        activeVariants: ['A', 'B'], // Both active = 50/50 split
    },
};

/**
 * Hook for A/B Testing
 * - Assigns variant on first visit (50/50)
 * - Persists in localStorage
 * - Respects active variants (for declaring winners)
 */
export function useABTest(testName: string): {
    variant: ABVariant;
    isVariantA: boolean;
    isVariantB: boolean;
    isLoaded: boolean;
} {
    const [variant, setVariant] = useState<ABVariant>('A');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storageKey = `ab_test_${testName}`;
        const config = AB_TESTS[testName];

        if (!config) {
            console.warn(`A/B Test "${testName}" not found in config`);
            setIsLoaded(true);
            return;
        }

        // Check URL parameter for testing (highest priority)
        const urlParams = new URLSearchParams(window.location.search);
        const variantParam = urlParams.get('variant')?.toUpperCase() as ABVariant | null;

        if (variantParam === 'A' || variantParam === 'B') {
            setVariant(variantParam);
            console.log(`🧪 A/B Test "${testName}": Forced variant ${variantParam} via URL`);
            setIsLoaded(true);
            return; // Don't persist forced variant
        }

        // Check if we have a stored variant
        let storedVariant = localStorage.getItem(storageKey) as ABVariant | null;

        // If stored variant is not in active variants, reassign
        if (storedVariant && !config.activeVariants.includes(storedVariant)) {
            storedVariant = null;
        }

        if (storedVariant) {
            setVariant(storedVariant);
        } else {
            // Assign new variant based on active variants
            let newVariant: ABVariant;

            if (config.activeVariants.length === 1) {
                // Winner declared - everyone gets the winner
                newVariant = config.activeVariants[0];
            } else {
                // 50/50 split
                newVariant = Math.random() < 0.5 ? 'A' : 'B';
            }

            localStorage.setItem(storageKey, newVariant);
            setVariant(newVariant);

            console.log(`🧪 A/B Test "${testName}": Assigned variant ${newVariant}`);
        }

        setIsLoaded(true);
    }, [testName]);

    return {
        variant,
        isVariantA: variant === 'A',
        isVariantB: variant === 'B',
        isLoaded,
    };
}

/**
 * Get current variant for a test (for tracking)
 */
export function getABVariant(testName: string): ABVariant {
    if (typeof window === 'undefined') return 'A';

    const storageKey = `ab_test_${testName}`;
    return (localStorage.getItem(storageKey) as ABVariant) || 'A';
}
