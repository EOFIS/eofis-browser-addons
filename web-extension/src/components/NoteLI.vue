<template>
    <!--<div class="box">-->
    <li class="note-row">
        <div class="note-row-front">
            <Icon v-if="isFavourite"  icon="heart" color="red"  title="Favourite" class="x30 i-btn" @click="isFavourite=false"/>
            <Icon v-if="!isFavourite" icon="heart" color="gray" title="Favourite" class="x30 i-btn" @click="isFavourite=true"/>
        </div>
        <div class="note-row-content">
            <div class="note-menu-bar pull-right">
                <span class="h30 note-source" :title="this.note.source.title">
                    {{this.note.source.title}}
                </span>
                <Icon icon="tag"   title="Tags"   class="x30 i-btn" @click="showTags"/>
                <Icon icon="trash" title="Delete" class="x30 i-btn" @click="deleteNote"/>
            </div>
            <div class="note-field-wrapper" :title="this.note.fields[0]">
                <span>{{this.note.fields[0]}}</span>
            </div>
            <!-- <p v-if="expanded" v-for="field in this.note.fields" :key="field.id">{{field}}</p> -->
        </div>
    </li>
    <!--</div>-->
</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.note-row {
    box-sizing:border-box;
    height:40px;
    line-height: 24px;
    width:100%;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;

    background: rgba(0,0,0,0);
    &:hover {
        background: rgba(0,0,0,0.05);
    }

    &>* {
        height:100%;
    }
}
// Leftmost bit
.note-row-front {
    width: 24px;
    float: left;
    margin-right: 4px;
}
.note-row-content {
    cursor: default;
    overflow: hidden;
}
.note-field-wrapper {
    padding: 2px 0;
    height: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.note-menu-bar {
    height: 100%;
    cursor: pointer;
    padding-top: 1px;
    white-space: nowrap;
    text-align: right;
}
.note-source {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
    padding: 0 5px;
    text-align: left;
}
.pull-right {
    float: right !important;
}
.h30 {
    height: 30px;
    line-height: 30px;
    word-break: break-all;
    font-size: 15px;
    text-align: center;
}
.x30 {
    @extend .h30;
    width: 30px;
}
.i-btn {
    cursor: pointer;
}
</style>

<script>
export default {
    name: "NoteLI",
    props: {
        note: Object
    },
    data() {
        return {
            isFavourite: this.note.favourite,
            expanded: false
        }
    },
    methods: {
        toggleFavourite() {
            if (this.isFavourite == true) {
                this.isFavourite = false;
            } else {
                this.isFavourite = true;
            }
        },
        showTags() {
            alert(this.note.tags);
        },
        deleteNote() {
            alert(`Deleting note: ${this.note._id.$oid}`);
        }
    },
    computed: {
        favouriteIcon() {
            if (this.isFavourite) {
                return {
                    icon: "heart",
                    color: "red"
                }
            } else {
                return {
                    icon: "trash",
                    color: undefined
                }
            }
        }
    }
}
</script>

