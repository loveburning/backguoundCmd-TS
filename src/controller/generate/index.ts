import Random from '../../common/tools/random';
import Verticaltitles from '../gm/verticaltitles'
import Cover from '../gm/cover'

export default class Generate {
    arr: string[];
    path: object;
    private random: number;

    constructor(arr: string[], path: object) {
        this.arr = arr;
        this.path = path;
    }

    output() {
        // 生成随机数 控制背景图模版编号
        this.random = new Random(1, 3).random();

        // 竖标题
        let vert = this.arr.map(item => {
            return new Promise(resolve => {
                let vert = new Verticaltitles(item, this.path['verticaltitles']);
                vert.start(() => {
                    resolve();
                });
            })
        });

        // 竖标题生成完毕
        Promise.all(vert).then(() => {
            console.log('竖标题生成完毕');
        });

        // 封面图
        let cover = this.arr.map(item => {
            return new Promise(resolve => {
                let cover = new Cover(item, this.path['covers'], this.path['portrait'], this.random);
                cover.start(() => {
                    resolve();
                })
            })
        });

        // 封面图生成完毕
        Promise.all(cover).then(() => {
            console.log('封面图生成完毕');
        });

    }
}
