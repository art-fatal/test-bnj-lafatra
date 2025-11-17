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
        },
        pageCard: {
            slots: {
                container: 'gap-6 w-full',
                title: 'text-2xl font-bold font-sans text-gray-900',
                header: 'mb-2'
            }
        }
    }
})
