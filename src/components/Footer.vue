<template>
    <footer>
        <p><a href="https://news-airtport.pocopocori.com/" class="btn-icon site" target="_blank">NewsAirport Web</a></p>
        <p><a href="mailto:dev.pocori@gmail.com" class="btn-icon email">dev.pocori@gmail.com</a></p>
    </footer>
</template>
<style lang="scss" scoped>
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80px;
        padding: 15px;
        background: #333;

        p:first-child {
            position: relative;
            padding-right: 6px;
            margin-right: 6px;

            &::after {
                display: block;
                content: '';
                position: absolute;
                right: 0;
                top: 2px;
                width: 1px;
                height: 13px;
                background: #f5f5f5;
            }
        }

        a {
            font-size: 12px;
            color: #f5f5f5;
            line-height: 1.4;

            &::before {
                margin-right: 5px;
            }

            &.site::before {
                content: '\e852';
            }

            &.email::before {
                content: '\e818';
            }
        }
    }
</style>