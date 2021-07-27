<template>
    <!--<div class="box">-->
    <li class="note-row">
        <div class="note-row-front">
            <Icon v-if="isFavourite"  icon="heart" title="Favourite" class="x30 i-btn btn-note-fav active" @click="console.log('FAV CLICK');"/>
            <Icon v-if="!isFavourite" icon="heart" title="Favourite" class="x30 i-btn btn-note-fav hover-visible" @click="console.log('fav clicked');"/>
        </div>
        <div class="note-row-content">
            <div class="note-menu-bar pull-right">
                <span class="h30 note-source" :title="this.note.source.title">
                    {{this.note.source.title}}
                </span>
                <Icon icon="tag"   title="Tags"   class="x30 i-btn hover-visible btn-note-tags" @click="showTags"/>
                <Icon icon="trash" title="Delete" class="x30 i-btn hover-visible btn-note-delete" @click="deleteNote"/>
            </div>
            <div class="note-field-wrapper" :title="this.note.fields[0]">
                <span v-for="field in this.note.fields" :key="field.id">
                    {{field}}
                </span>
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
    height: 32px;
    padding: 3px;
    line-height: 24px;
    width:100%;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;

    border-style: solid;
    border-color: rgba(0,0,0,0.03); // Same colour as the rows go when hovered
    border-width: 0 0 1px 0;

    background: rgba(0,0,0,0);
    &:hover {
        background: rgba(0,0,0,0.03);

        .hover-visible {
            opacity: 1;
        }
    }
    .hover-visible {
        opacity: 0;
        transition: 0.4s;
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
    text-overflow: ellipsis;
    & > * {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        color: #030;
    }
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

    color: inherit;
    transition: 0.4s;
    &:hover {
        color: #ff6600;
    }
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
    @extend .x30;
    font-size: 20px;
    // margin-top: 6px;
    color:  rgba(0,0,0,0.5);
    transition: 0.4s;
    cursor: pointer;
}
.btn-note-tags {
    &:hover {
        color: green;
    }
}
.btn-note-delete {
    &:hover {
        color: red;
    }
}
.btn-note-fav {
    &:hover {
        color: red;
    }
    &.active {
        color: red;
    }
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

