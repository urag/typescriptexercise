import { MongoClient, Db } from 'mongodb';

export class MongoConnection {
  private client: MongoClient | undefined;
  public static db: Db;
  private initialized = false;

  constructor(
    public readonly url: string,
  ) { }

  public async connect(): Promise<void> {
    this.client = await MongoClient.connect(
      this.url,
      { useNewUrlParser: true },
    );
    MongoConnection.db = this.client.db();
    this.initialized = true;
  }

  public async close(): Promise<void> {
    if (!this.initialized) return;
    await this.client!.close();
    this.initialized = false;
  }
}
