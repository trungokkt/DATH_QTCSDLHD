module.exports = function saveItem(items) {
    this.items = items || [];
    this.add = (vaccineId) => {
        var index = this.items.indexOf(vaccineId)
        if (index == -1) {
            this.items.push(vaccineId)
        }
        return this.get()
    }
    this.replaceItems = (vaccineIds) => {
        this.items = vaccineIds
        return this.get()
    }
    this.remove = (vaccineId) => {
        var index = this.items.indexOf(vaccineId)
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        return this.get()
    }
    this.empty = () => {
        this.items = [];
        return this.get()
    }
    this.get = () => {
        return this.items;
    }

};
