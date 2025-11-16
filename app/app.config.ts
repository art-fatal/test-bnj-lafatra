export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            secondary: 'purple',
            tertiary: 'indigo'
        },
        formField: {
            defaultVariants: {
                size: 'sm'
            },
            slots: {
                container: 'mt-1.5'
            }
        },
        button: {
            slots: {
                base: 'justify-center'
            }
        },
        input: {
            slots: {
              root: 'w-full'
            },
            defaultVariants: {
                size: 'lg'
            }
        }
    }
})
