// Allow boolean values in className for conditional concatenations
// This augments React's HTMLAttributes so expressions like condition && 'cls'
// are accepted by TypeScript when passed to className.
import 'react';

declare module 'react' {
    // Allow `T` generic to be declared without triggering unused-var lint,
    // since this interface merges with React's existing generic definition.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
        className?: string | false | null | undefined;
    }
}
