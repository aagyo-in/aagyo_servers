import { ConflictException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';

export class CrudService {
  constructor(private readonly rootModel: mongoose.Model<any>) {
    this.rootModel = rootModel;
  }

  async createOne(document: Partial<any>) {
    const newDocument = new this.rootModel(document);
    try {
      return await newDocument.save();
    } catch (e) {
      console.log(e);
      throw new ConflictException(`Something Went Wrong, Can't Create`);
    }
  }

  async createMany(documents) {
    return await this.rootModel.insertMany(documents);
  }

  async findOne(query: Partial<any>) {
    return await this.rootModel.findOne(query).exec();
  }

  async findOneById(id: mongoose.Types.ObjectId) {
    const existingDocument = await this.rootModel.findById(id).exec();
    if (!existingDocument) {
      throw new NotFoundException('Not Found');
    }
    return existingDocument;
  }

  async findMany(query: Partial<any>) {
    return await this.rootModel.find(query).exec();
  }

  async updateOneById(id: mongoose.Types.ObjectId, update: Partial<any>) {
    const updateResult = await this.rootModel
      .updateOne({ _id: id }, update)
      .exec();
    if (updateResult.modifiedCount === 0) {
      throw new ConflictException(`Not Found, Can't Update`);
    }
    return updateResult;
  }

  async deleteOne(query: Partial<any>) {
    return await this.rootModel.deleteOne(query).exec();
  }

  async deleteOneById(id: mongoose.Types.ObjectId) {
    const deleteResult = await this.rootModel.deleteOne({ _id: id }).exec();
    if (deleteResult.deletedCount === 0) {
      throw new ConflictException(`Not Found, Can't Delete`);
    }
    return deleteResult;
  }

  async deleteMany(query) {
    return await this.rootModel.deleteMany(query).exec();
  }

  async findAndUpdateOneById(id: mongoose.ObjectId, update: Partial<any>) {
    const updateResult = await this.rootModel
      .findByIdAndUpdate({ _id: id }, update, { new: true })
      .exec();
    if (updateResult.modifiedCount === 0) {
      throw new ConflictException(`Not Found, Can't Update`);
    }
    return updateResult;
  }
}
