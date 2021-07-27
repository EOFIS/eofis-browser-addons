<template>
    <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul class="vs-crumbs" v-if="crumbs.length" >
            <li v-for="(crumb, i) in crumbs" :key="i">
                <router-link v-if="i < crumbs.length-1" :to="crumb.path">{{ crumb.name }}</router-link>
                <span class="last is-active" v-else >{{ crumb.name }}</span>
            </li>
        </ul>
    </nav>
</template>
<script>
/*=============================================================================
 *   Created by NxtChg (admin@nxtchg.com), 2017. License: Public Domain.
 *   =============================================================================*/
export default {
    name: 'VSCrumbs',
    props: { root: String },
    computed: {
        crumbs: function() {
            var path = '', title = (this.root || 'home');

            var cs = [ { name: title, path: '/'} ]; if(!this.$route) return [];

            var r = (this.$route.path                        ).split('/');
            var m = [];// This gives an error ->(this.$route.matched[0].meta.crumbs || '').split('/');

            for(var i = 1; i < r.length; i++)
            {
                var name = (m[i] || r[i]); if(r[i] == '') continue;

                title += ' : '+ name;
                path  += '/'  + name;

                cs.push({ name: name, path: path });
            }
            window.document.title = title;
            return cs;
        }
    }
}
</script>

<style>
/*.vs-crumbs      { font-size:125%; font-family: Verdana; }
 .vs-crumbs .last{ opacity:0.66; }
 .vs-crumbs a:after{ margin-left:8px; width:0; height:0; display:inline-block; border:5px solid transparent; border-left:5px solid #F50; content:"" }
 */
</style>
