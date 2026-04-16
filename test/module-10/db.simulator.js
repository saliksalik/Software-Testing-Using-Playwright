const fs = require('fs');
const path = require('path');

class FakeDatabase {
  constructor(seed) {
    this.users = new Map(seed.users.map((u) => [u.id, { ...u }]));
    this.orders = new Map(seed.orders.map((o) => [o.orderId, { ...o }]));
    this.auditLogs = [];
    this.outbox = [];
  }

  static fromSeedFile() {
    const filePath = path.join(__dirname, 'data', 'seed.users.orders.json');
    const seed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return new FakeDatabase(seed);
  }

  beginTransaction() {
    return {
      users: new Map(Array.from(this.users.entries()).map(([k, v]) => [k, { ...v }])),
      orders: new Map(Array.from(this.orders.entries()).map(([k, v]) => [k, { ...v }])),
      auditLogs: [...this.auditLogs],
      outbox: [...this.outbox]
    };
  }

  rollback(snapshot) {
    this.users = snapshot.users;
    this.orders = snapshot.orders;
    this.auditLogs = snapshot.auditLogs;
    this.outbox = snapshot.outbox;
  }

  insertUser(user) {
    const exists = Array.from(this.users.values()).some((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (exists) {
      throw new Error('UNIQUE_EMAIL_VIOLATION');
    }
    this.users.set(user.id, { ...user });
  }

  insertOrder(order) {
    if (!this.users.has(order.userId)) {
      throw new Error('FK_USER_NOT_FOUND');
    }
    if (this.orders.has(order.orderId)) {
      throw new Error('UNIQUE_ORDER_ID_VIOLATION');
    }

    this.orders.set(order.orderId, { ...order });
    this.auditLogs.push({ action: 'ORDER_CREATED', orderId: order.orderId, at: new Date().toISOString() });
    this.outbox.push({ type: 'ORDER_CREATED_EVENT', orderId: order.orderId, tries: 0 });
  }

  getOrder(orderId) {
    return this.orders.get(orderId) || null;
  }

  getUserByEmail(email) {
    return Array.from(this.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  processOutboxWithRetry(maxRetries = 3) {
    const delivered = [];

    for (const event of this.outbox) {
      let deliveredNow = false;
      while (event.tries < maxRetries && !deliveredNow) {
        event.tries += 1;

        // Deterministic behavior: first attempt fails, next attempt succeeds.
        if (event.tries >= 2) {
          deliveredNow = true;
        }
      }

      if (deliveredNow) {
        delivered.push(event);
      }
    }

    this.outbox = this.outbox.filter((ev) => !delivered.includes(ev));
    return delivered;
  }
}

module.exports = {
  FakeDatabase
};
