const files = import.meta.glob('/public/social-proof/*', { eager: true });
console.log(files);
