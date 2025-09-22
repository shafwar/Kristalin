// Allow boolean values in className for conditional concatenations
// This augments React's HTMLAttributes so expressions like condition && 'cls'
// are accepted by TypeScript when passed to className.
import 'react';

declare module 'react' {
    interface HTMLAttributes<T> {
        className?: string | false | null | undefined;
    }
}
