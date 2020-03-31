class AjaxToken {
    constructor () {
        this.queue = {}; // 创建队列
    }

    // 保存某个axios的cancelToken
    saveAxiosQueue ({ axiosKeyName, axiosCancel }) {
        this.queue[axiosKeyName] = axiosCancel;
    }

    /**
     * 移除某个axios的cancelToken
     * @param {string} axiosKeyName key的值
     */
    removeAxiosQueueByName (axiosKeyName) {
        if (this.queue[axiosKeyName]) {
            this.queue[axiosKeyName]();
            delete this.queue[axiosKeyName];
        }
    }
    // 移除队列所有axios的cancelToken
    removeAllAxiosQueue () {
        for (let key in this.queue) {
            this.removeAxiosQueueByName(key);
        }
    }
}

export default new AjaxToken();
