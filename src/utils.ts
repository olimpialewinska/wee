export const classNames = (...args: (string | boolean)[]) => {
    return args.filter(Boolean).join(' ');
}